import radioEditForm from "formiojs/components/radio/Radio.form"
import SimpleApi from "../Common/Simple.edit.api.js"
import SimpleConditional from "../Common/Simple.edit.conditional.js"
import EditData from "./editForm/Component.edit.data.js"
import EditDisplay from "./editForm/Component.edit.display.js"
import EditValidation from "./editForm/Component.edit.validation.js"
export default function (...extend) {
  return radioEditForm(
    [
      EditDisplay,
      {
        key: "data",
        ignore: true,
      },
      {
        key: "api",
        ignore: true,
      },
      {
        key: "layout",
        ignore: true,
      },
      {
        key: "conditional",
        ignore: true,
      },
      {
        key: "validation",
        ignore: true,
      },
      {
        key: "logic",
        ignore: true,
      },
      {
        label: "Data",
        key: "customData",
        weight: 10,
        components: EditData,
      },
      {
        label: "Validation",
        key: "customValidation",
        weight: 20,
        components: EditValidation,
      },
      {
        label: "API",
        key: "customAPI",
        weight: 30,
        components: SimpleApi,
      },
      {
        label: "Conditional",
        key: "customConditional",
        weight: 40,
        components: SimpleConditional,
      },
    ],
    ...extend
  )
}
