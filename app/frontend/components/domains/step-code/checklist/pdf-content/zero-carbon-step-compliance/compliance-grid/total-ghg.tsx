import { Text } from "@react-pdf/renderer"
import { t } from "i18next"
import React, { useContext } from "react"
import { theme } from "../../../../../../../styles/theme"
import { i18nPrefix } from "../../../zero-carbon-step-code-compliance/i18n-prefix"
import { Divider } from "../../shared/divider"
import { Field } from "../../shared/field"
import { GridItem } from "../../shared/grid-item"
import { HStack } from "../../shared/h-stack"
import { RequirementsMetTag } from "../../shared/requirements-met-tag"
import { VStack } from "../../shared/v-stack"
import { StepCodeChecklistContext } from "../../step-code-checklist-context"

export function TotalGHG() {
  const { checklist } = useContext(StepCodeChecklistContext)

  return (
    <>
      <HStack
        style={{
          width: "100%",
          alignItems: "stretch",
          borderBottomWidth: 0.75,
          borderColor: theme.colors.border.light,
          gap: 0,
        }}
      >
        <GridItem style={{ flex: 1 }}>
          <Text style={{ fontSize: 10.5 }}>{t(`${i18nPrefix}.ghg.label`)}</Text>
        </GridItem>
        <GridItem style={{ flex: 1 }}>
          <Field
            value={checklist.totalGhgRequirement || "-"}
            hint={t(`${i18nPrefix}.max`)}
            inputStyle={{ justifyContent: "center" }}
            rightElement={
              <VStack style={{ gap: 1.5 }}>
                <Text style={{ fontSize: 8.25, color: theme.colors.text.secondary }}>
                  {t(`${i18nPrefix}.ghg.units.numerator`)}
                </Text>
                <Divider style={{ marginTop: 0, marginBottom: 0 }} />
                <Text style={{ fontSize: 8.25, color: theme.colors.text.secondary }}>
                  {t(`${i18nPrefix}.ghg.units.denominator`)}
                </Text>
              </VStack>
            }
          />
        </GridItem>
        <GridItem style={{ flex: 1, alignItems: "flex-start" }}>
          <Field
            value={checklist.totalGhg || "-"}
            inputStyle={{ justifyContent: "center" }}
            rightElement={
              <VStack style={{ gap: 1.5 }}>
                <Text style={{ fontSize: 8.25, color: theme.colors.text.secondary }}>
                  {t(`${i18nPrefix}.ghg.units.numerator`)}
                </Text>
                <Divider style={{ marginTop: 0, marginBottom: 0 }} />
                <Text style={{ fontSize: 8.25, color: theme.colors.text.secondary }}>
                  {t(`${i18nPrefix}.ghg.units.denominator`)}
                </Text>
              </VStack>
            }
          />
        </GridItem>

        <GridItem style={{ flex: 1, justifyContent: "center", borderRightWidth: 0 }}>
          <RequirementsMetTag success={checklist.ghgPassed} />
        </GridItem>
      </HStack>
    </>
  )
}
