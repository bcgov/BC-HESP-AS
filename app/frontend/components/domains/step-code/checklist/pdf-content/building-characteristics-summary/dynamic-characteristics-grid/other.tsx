import { Text } from "@react-pdf/renderer"
import { t } from "i18next"
import React, { useContext } from "react"
import { theme } from "../../../../../../../styles/theme"
import { i18nPrefix } from "../../../building-characteristics-summary/i18n-prefix"
import { Field } from "../../shared/field"
import { GridItem } from "../../shared/grid-item"
import { HStack } from "../../shared/h-stack"
import { StepCodeChecklistContext } from "../../step-code-checklist-context"

export function Other() {
  const { checklist } = useContext(StepCodeChecklistContext)

  return (
    <>
      <HStack
        style={{
          width: "100%",
          alignItems: "stretch",
          backgroundColor: theme.colors.greys.grey03,
          borderBottomWidth: 0.75,
          borderColor: theme.colors.border.light,
          gap: 0,
        }}
      >
        <GridItem
          style={{
            flexBasis: "100%",
            maxWidth: "100%",
            borderRightWidth: 0,
          }}
        >
          <Text style={{ fontSize: 10.5 }}>{t(`${i18nPrefix}.other`)}</Text>
        </GridItem>
      </HStack>
      {checklist.buildingCharacteristicsSummary.otherLines.map((line, index) => (
        <HStack
          style={{
            width: "100%",
            alignItems: "stretch",
            gap: 0,
          }}
        >
          <GridItem style={{ flexBasis: "100%", minWidth: "100%", borderRightWidth: 0 }}>
            <Field value={line.details} />
          </GridItem>
        </HStack>
      ))}
    </>
  )
}
