//Order we only need atomic
const Order = {
  ATOMIC: 0,
};

//Get if these exist
let functionsThatExist = {
  vert: false,
  frag: false,
};

//Base GLSL code
penPlus.Generated_GLSL = penPlus.defaultShader + penPlus.defaultVert + penPlus.defaultFrag;

//Helper function to convert the next block
function nextBlockToCode(block, generator) {
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock) {
    return "\n" + penPlus.GLSL_GEN.blockToCode(nextBlock);
  }
  return "";
}

function createGLSLGen() {
  //Create the default GLSL generator
  penPlus.GLSL_GEN = new Blockly.Generator("GLSL");
  const GLSL_GEN = penPlus.GLSL_GEN;

  //Base reporters
  GLSL_GEN.forBlock["number_reporter"] = function (block, generator) {
    const numba = block.getFieldValue("NUMBER");
    return [`float(${numba})`, Order.ATOMIC];
  };

  GLSL_GEN.forBlock["blank_reporter"] = function (block, generator) {
    return [``, Order.ATOMIC];
  };

  GLSL_GEN.forBlock["number_NOFLOAT_reporter"] = function (block, generator) {
    const numba = block.getFieldValue("NUMBER");
    return [numba, Order.ATOMIC];
  };

  GLSL_GEN.forBlock["int_reporter"] = function (block, generator) {
    const numba = block.getFieldValue("NUMBER");
    return [`int(${numba})`, Order.ATOMIC];
  };

  GLSL_GEN.forBlock["color_reporter"] = function (block, generator) {
    const colour = block.getFieldValue("COLOUR");
    let converted = penPlus.hexToRgb(colour);
    converted.r /= 255;
    converted.g /= 255;
    converted.b /= 255;
    return [`vec4(${converted.r},${converted.g},${converted.b},1.0)`, Order.ATOMIC];
  };

  GLSL_GEN.forBlock["vec2_reporter"] = function (block, generator) {
    const x = block.getFieldValue("x");
    const y = block.getFieldValue("y");
    return [`vec2(${x},${y})`, Order.ATOMIC];
  };

  GLSL_GEN.forBlock["vec3_reporter"] = function (block, generator) {
    const x = block.getFieldValue("x");
    const y = block.getFieldValue("y");
    const z = block.getFieldValue("z");
    return [`vec3(${x},${y},${z})`, Order.ATOMIC];
  };

  GLSL_GEN.forBlock["vec4_reporter"] = function (block, generator) {
    const x = block.getFieldValue("x");
    const y = block.getFieldValue("y");
    const z = block.getFieldValue("z");
    const w = block.getFieldValue("w");
    return [`vec4(${x},${y},${z},${w})`, Order.ATOMIC];
  };

  GLSL_GEN.forBlock["matrix2_reporter"] = function (block, generator) {
    return [`mat2(${block.getFieldValue("00")},${block.getFieldValue("01")},${block.getFieldValue("10")},${block.getFieldValue("11")})`, Order.ATOMIC];
  };

  GLSL_GEN.forBlock["matrix3_reporter"] = function (block, generator) {
    return [`mat3(${block.getFieldValue("00")},${block.getFieldValue("01")},${block.getFieldValue("02")},${block.getFieldValue("10")},${block.getFieldValue("11")},${block.getFieldValue("12")},${block.getFieldValue("20")},${block.getFieldValue("21")},${block.getFieldValue("22")})`, Order.ATOMIC];
  };

  GLSL_GEN.forBlock["matrix4_reporter"] = function (block, generator) {
    return [`mat4(${block.getFieldValue("00")},${block.getFieldValue("01")},${block.getFieldValue("02")},${block.getFieldValue("03")},${block.getFieldValue("10")},${block.getFieldValue("11")},${block.getFieldValue("12")},${block.getFieldValue("13")},${block.getFieldValue("20")},${block.getFieldValue("21")},${block.getFieldValue("22")},${block.getFieldValue("23")},${block.getFieldValue("30")},${block.getFieldValue("31")},${block.getFieldValue("32")},${block.getFieldValue("33")})`, Order.ATOMIC];
  };

  GLSL_GEN.forBlock["string_reporter"] = function (block, generator) {
    const numba = block.getFieldValue("STRING");
    return [`${numba}`, Order.ATOMIC];
  };
}

function updateGLSL(event) {
  if (penPlus.workspace.isDragging()) return; // Don't update while changes are happening.
  if (!penPlus.supportedEvents.has(event.type)) return;
  if (!penPlus.autoCompile && !event.isManualCompile) return;

  penPlus.dispatchEvent("onCompileStart");

  penPlus.timer = 0;

  document.getElementById("shaderLog").innerHTML = "";

  if (!penPlus.isTextMode) {
    //Base GLSL code
    penPlus.Generated_GLSL = penPlus.defaultShader;

    //Add Variables
    workspace.getAllVariables().forEach((variable) => {
      let type = variable.type;

      if (type == "texture") type = "sampler2D";
      if (type == "cubemap") type = "samplerCube";
      if (type == "matrix_2x") type = "mat2";
      if (type == "matrix_3x") type = "mat3";
      if (type == "matrix_4x") type = "mat4";

      let appendance = "";

      let scope = variable.name.split(" ")[0].split("[")[0];
      if (scope == "array") {
        scope = "uniform";
        appendance = `[${variable.name.split(" ")[0].split("[")[1].replace("]", "")}]`;
      }
      if (scope == "hat") return;

      if (!variable.name.split(" ")[1]) return;

      //Types that don't have precision
      if (variable.type == "texture" || variable.type == "cubemap" || variable.type == "int") penPlus.Generated_GLSL += `\n${variable.name.split(" ")[0]} ${type} ${variable.name.split(" ")[1] + appendance};\n`;
      else penPlus.Generated_GLSL += `\n${scope} highp ${type} ${variable.name.split(" ")[1] + appendance};\n`;
    });

    //Add some spacing
    penPlus.Generated_GLSL += `\n`;

    penPlus.Generated_GLSL += penPlus.GLSL_GEN.workspaceToCode(penPlus.workspace);

    penPlus.dispatchEvent("onMainScriptCompiled");

    penPlus.monacoEditor.setValue(penPlus.Generated_GLSL);
  } else {
    penPlus.Generated_GLSL = penPlus.monacoEditor.getValue();
    penPlus.dispatchEvent("onMainScriptCompiled");
  }

  penPlus.Generated_Frag = "";
  penPlus.Generated_Vert = "";

  penPlus.loopID = 0;

  workspace.getToolbox().refreshSelection();

  let inner = 0;

  let vertFunction = "";
  let fragFunction = "";

  //If there is no vertex shader then add one.

  if (!penPlus.Generated_GLSL.includes("void vertex")) {
    penPlus.Generated_GLSL += penPlus.defaultVert;
  }

  if (!penPlus.Generated_GLSL.includes("void fragment")) {
    penPlus.Generated_GLSL += penPlus.defaultFrag;
  }

  for (let letterID = penPlus.Generated_GLSL.indexOf("void vertex"); letterID < penPlus.Generated_GLSL.length; letterID++) {
    const letter = penPlus.Generated_GLSL.charAt(letterID);
    vertFunction += letter;
    if (letter == "{") {
      inner += 1;
    } else if (letter == "}") {
      inner -= 1;
      if (inner == 0) {
        break;
      }
    }
  }

  inner = 0;

  for (let letterID = penPlus.Generated_GLSL.indexOf("void fragment"); letterID < penPlus.Generated_GLSL.length; letterID++) {
    const letter = penPlus.Generated_GLSL.charAt(letterID);
    fragFunction += letter;
    if (letter == "{") {
      inner += 1;
    } else if (letter == "}") {
      inner -= 1;
      if (inner == 0) {
        break;
      }
    }
  }

  //I know this isn't the best but it works
  penPlus.Generated_Vert = penPlus.makeVertexSafe((penPlus.Generated_GLSL.replace(fragFunction, fragFunction.replace(/[^\n]/g, ''))).replace("void vertex", "void main"));

  console.log(vertFunction.replace(/^\n/, ""));
  //This too
  penPlus.Generated_Frag = penPlus.makeFragmentSafe((penPlus.Generated_GLSL.replace(vertFunction, vertFunction.replace(/[^\n]/g, ''))).replace("void fragment", "void main"));

  genProgram();
}
