import { Box, Button, Divider, Heading, HeadingProps, HStack, Stack, Text } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import React from "react"
import { useTranslation } from "react-i18next"
import { IDenormalizedRequirementTemplateSection } from "../../../types/types"

interface IProps {
  onEdit?: () => void
  onItemClick?: (id: string) => void
  sectionIdToHighlight: null | string
  sections: IDenormalizedRequirementTemplateSection[]
}

export const SectionsSidebar = observer(function SectionsSidebar({
  onEdit,
  onItemClick,
  sectionIdToHighlight,
  sections,
}: IProps) {
  const { t } = useTranslation()
  const highLightedSectionStyles: Partial<HeadingProps> = {
    bg: "theme.blueLight",
    color: "text.link",
    borderLeft: "4px solid",
    borderColor: "theme.blueAlt",
  }

  return (
    <Box
      w={"368px"}
      as={"section"}
      h={"full"}
      minH="70vh"
      borderRight={"1px solid"}
      borderColor={"border.light"}
      boxShadow={"elevations.elevation01"}
      overflow={"auto"}
    >
      {onEdit && (
        <HStack w={"full"} justifyContent={"space-between"} bg={"greys.grey03"} py={5} px={4}>
          <>
            <Text as={"h3"} fontSize={"sm"} fontWeight={400} color={"text.secondary"} textTransform={"uppercase"}>
              {t("requirementTemplate.edit.sectionsSidebarTitle")}
            </Text>
            <Button variant={"secondary"} onClick={onEdit} size={"sm"}>
              {t("requirementTemplate.edit.reorderButton")}
            </Button>
          </>
        </HStack>
      )}
      <Stack w={"full"} spacing={4} alignItems={"flex-start"} py={2}>
        {sections?.map((section, index) => {
          const isHighlightedSection = sectionIdToHighlight === section.id
          return (
            <React.Fragment key={section.id}>
              <Box as={"section"} w={"full"}>
                <Heading
                  as="h3"
                  fontSize={"sm"}
                  fontWeight={700}
                  pl={6}
                  pr={4}
                  py={2}
                  m={0}
                  _hover={{ textDecoration: "underline" }}
                  onClick={() => onItemClick?.(section.id)}
                  cursor={"pointer"}
                  {...(isHighlightedSection ? highLightedSectionStyles : {})}
                >
                  {section.name}
                </Heading>
                {section.templateSectionBlocks.length > 0 && (
                  <Box as={"ol"} sx={{ listStyle: "none" }} w={"full"} p={0} m={0}>
                    {section.templateSectionBlocks.map((sectionBlock) => {
                      return (
                        <Text
                          as={"li"}
                          key={sectionBlock.id}
                          pl={6}
                          pr={4}
                          py={2}
                          _hover={{ textDecoration: "underline" }}
                          onClick={() => onItemClick?.(sectionBlock.id)}
                          cursor={"pointer"}
                        >
                          {sectionBlock.requirementBlock?.name}
                        </Text>
                      )
                    })}
                  </Box>
                )}
              </Box>
              {index < sections.length - 1 && <Divider borderColor={"border.light"} m={0} />}
            </React.Fragment>
          )
        })}
      </Stack>
    </Box>
  )
})
