{
  penPlus.categories = penPlus.categories || {};

  class vector_category extends penPlus.penPlusExtension {
    getInfo() {
      return {
        name: "Vector",
        id: "vector",
        color1: "#5AB897",
        color2: "#47AA8C",
        color3: "#339178",
        blocks: [
          {
            opcode: "vec2",
            type: "reporter",
            text: "x:%1 y:%2",
            tooltip: "A vector with 2 elements",
            output: "vec2 arithmatic",
            arguments: [
              {
                type: "input_value",
                name: "x",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "y",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "vec3",
            type: "reporter",
            text: "x:%1 y:%2 z:%3",
            tooltip: "A vector with 3 elements",
            output: "vec3 arithmatic",
            style: "vec3_blocks",
            arguments: [
              {
                type: "input_value",
                name: "x",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "y",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "z",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          {
            opcode: "vec4",
            type: "reporter",
            text: "x:%1 y:%2 z:%3 w:%4",
            tooltip: "A vector with 4 elements",
            output: "vec4 arithmatic",
            style: "vec4_blocks",
            arguments: [
              {
                type: "input_value",
                name: "x",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "y",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "z",
                shadow: {
                  type: "number_reporter",
                },
              },
              {
                type: "input_value",
                name: "w",
                shadow: {
                  type: "number_reporter",
                },
              },
            ],
          },
          "---",
          {
            opcode: "getitem",
            type: "reporter",
            text: "%1 of %2",
            tooltip: "A Custom Block!",
            output: "arithmatic",
            //style: "return_block", I somewhat like this gray
            arguments: [
              penPlus.createGrid(
                [
                  ["x", "x"],
                  ["y", "y"],
                  ["z", "z"],
                  ["w", "w"],
                ],
                "coordinate",
                4
              ),
              {
                type: "input_value",
                name: "vector",
                shadow: {
                  type: "vec4_reporter",
                },
              },
            ],
          },
          {
            opcode: "getitemVec2",
            type: "reporter",
            text: "components %1 %2 of %3",
            tooltip: "A Custom Block!",
            output: "arithmatic",
            //style: "return_block", I somewhat like this gray
            arguments: [
              penPlus.createGrid([["x", "x"],["y", "y"],["z", "z"],["w", "w"],],"coordinateX",4),
              penPlus.createGrid([["x", "x"],["y", "y"],["z", "z"],["w", "w"],],"coordinateY",4),
              {
                type: "input_value",
                name: "vector",
                shadow: {
                  type: "vec4_reporter",
                },
              },
            ],
          },
          {
            opcode: "getitemVec3",
            type: "reporter",
            text: "components %1 %2 %3 of %4",
            tooltip: "A Custom Block!",
            output: "arithmatic",
            //style: "return_block", I somewhat like this gray
            arguments: [
              penPlus.createGrid([["x", "x"],["y", "y"],["z", "z"],["w", "w"],],"coordinateX",4),
              penPlus.createGrid([["x", "x"],["y", "y"],["z", "z"],["w", "w"],],"coordinateY",4),
              penPlus.createGrid([["x", "x"],["y", "y"],["z", "z"],["w", "w"],],"coordinateZ",4),
              {
                type: "input_value",
                name: "vector",
                shadow: {
                  type: "vec4_reporter",
                },
              },
            ],
          },
          {
            opcode: "getitemVec4",
            type: "reporter",
            text: "components %1 %2 %3 %4 of %5",
            tooltip: "A Custom Block!",
            output: "arithmatic",
            //style: "return_block", I somewhat like this gray
            arguments: [
              penPlus.createGrid([["x", "x"],["y", "y"],["z", "z"],["w", "w"],],"coordinateX",4),
              penPlus.createGrid([["x", "x"],["y", "y"],["z", "z"],["w", "w"],],"coordinateY",4),
              penPlus.createGrid([["x", "x"],["y", "y"],["z", "z"],["w", "w"],],"coordinateZ",4),
              penPlus.createGrid([["x", "x"],["y", "y"],["z", "z"],["w", "w"],],"coordinateW",4),
              {
                type: "input_value",
                name: "vector",
                shadow: {
                  type: "vec4_reporter",
                },
              },
            ],
          },
          "---",
          "Vector Operations",
          {
            opcode: "normalize",
            type: "reporter",
            text: "normalize %1",
            tooltip: "Makes the length of a vector 1",

            arguments: [
              {
                type: "input_value",
                name: "a",
                shadow: {
                  type: "vec2_reporter",
                },
              },
            ],
          },
          {
            opcode: "dot",
            type: "reporter",
            text: "dot product of %1 and %2",
            tooltip: "Makes the length of a vector 1",

            arguments: [
              {
                type: "input_value",
                name: "a",
                shadow: {
                  type: "vec3_reporter",
                },
              },
              {
                type: "input_value",
                name: "b",
                shadow: {
                  type: "vec3_reporter",
                },
              },
            ],
          },
          {
            opcode: "cross",
            type: "reporter",
            text: "cross product of %1 and %2",
            tooltip: "Makes the length of a vector 1",

            arguments: [
              {
                type: "input_value",
                name: "a",
                shadow: {
                  type: "vec3_reporter",
                },
              },
              {
                type: "input_value",
                name: "b",
                shadow: {
                  type: "vec3_reporter",
                },
              },
            ],
          },
          {
            opcode: "length",
            type: "reporter",
            text: "length of %1",
            tooltip: "Makes the length of a vector 1",

            arguments: [
              {
                type: "input_value",
                name: "a",
                shadow: {
                  type: "vec2_reporter",
                },
              },
            ],
          },
        ],
      };
    }

    vec2(block, generator) {
      return [`vec2(${generator.valueToCode(block, "x", Order.ATOMIC)},${generator.valueToCode(block, "y", Order.ATOMIC)})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    vec3(block, generator) {
      return [`vec3(${generator.valueToCode(block, "x", Order.ATOMIC)},${generator.valueToCode(block, "y", Order.ATOMIC)},${generator.valueToCode(block, "z", Order.ATOMIC)})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    vec4(block, generator) {
      return [`vec4(${generator.valueToCode(block, "x", Order.ATOMIC)},${generator.valueToCode(block, "y", Order.ATOMIC)},${generator.valueToCode(block, "z", Order.ATOMIC)},${generator.valueToCode(block, "w", Order.ATOMIC)})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    getitem(block, generator) {
      return [`${generator.valueToCode(block, "vector", Order.ATOMIC)}.${block.getFieldValue("coordinate")}`, Order.ATOMIC];
    }

    getitemVec2(block, generator) {
      return [`${generator.valueToCode(block, "vector", Order.ATOMIC)}.${block.getFieldValue("coordinateX")}${block.getFieldValue("coordinateY")}`, Order.ATOMIC];
    }

    getitemVec3(block, generator) {
      return [`${generator.valueToCode(block, "vector", Order.ATOMIC)}.${block.getFieldValue("coordinateX")}${block.getFieldValue("coordinateY")}${block.getFieldValue("coordinateZ")}`, Order.ATOMIC];
    }

    getitemVec4(block, generator) {
      return [`${generator.valueToCode(block, "vector", Order.ATOMIC)}.${block.getFieldValue("coordinateX")}${block.getFieldValue("coordinateY")}${block.getFieldValue("coordinateZ")}${block.getFieldValue("coordinateW")}`, Order.ATOMIC];
    }

    normalize(block, generator) {
      return [`normalize(${generator.valueToCode(block, "a", Order.ATOMIC)})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    dot(block, generator) {
      return [`dot(${generator.valueToCode(block, "a", Order.ATOMIC)}, ${generator.valueToCode(block, "b", Order.ATOMIC)})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    cross(block, generator) {
      return [`cross(${generator.valueToCode(block, "a", Order.ATOMIC)}, ${generator.valueToCode(block, "b", Order.ATOMIC)})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }

    length(block, generator) {
      return [`length(${generator.valueToCode(block, "a", Order.ATOMIC)})` + nextBlockToCode(block, generator), Order.ATOMIC];
    }
  }

  penPlus.categories.vector = vector_category;
}
