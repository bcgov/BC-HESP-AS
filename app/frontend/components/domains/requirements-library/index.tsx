import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Heading,
  ListItem,
  Tag,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react"
import { Archive } from "@phosphor-icons/react"
import { format } from "date-fns"
import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useMst } from "../../../setup/root"
import { Paginator } from "../../shared/base/inputs/paginator"
import { PerPageSelect } from "../../shared/base/inputs/per-page-select"
import { SharedSpinner } from "../../shared/base/shared-spinner"
import { SearchGrid } from "../../shared/grid/search-grid"
import { SearchGridItem } from "../../shared/grid/search-grid-item"
import { GridHeaders } from "./grid-header"

export const RequirementsLibraryScreen = observer(function RequirementsLibrary() {
  const { requirementBlockStore } = useMst()
  const {
    tableRequirementBlocks,
    currentPage,
    totalPages,
    totalCount,
    countPerPage,
    fetchRequirementBlocks,
    handleCountPerPageChange,
    handlePageChange,
    isSearching,
  } = requirementBlockStore
  const { t } = useTranslation()

  useEffect(() => {
    fetchRequirementBlocks()
  }, [])

  return (
    <Container maxW="container.lg" p={8} as="main">
      <VStack alignItems={"flex-start"} spacing={5} w={"full"} h={"full"}>
        <Flex justifyContent={"space-between"} w={"full"} alignItems={"flex-end"} gap={6}>
          <Box>
            <Heading fontSize={"4xl"} color={"text.primary"}>
              {t("requirementsLibrary.index.title")}
            </Heading>
            <Text color={"text.secondary"} mt={1}>
              {t("requirementsLibrary.index.description")}
            </Text>
          </Box>
          <Button variant={"primary"}>{t("requirementsLibrary.index.createButton")}</Button>
        </Flex>

        <SearchGrid templateColumns="repeat(4, 1fr) 85px">
          <GridHeaders />

          {isSearching ? (
            <Center p={50}>
              <SharedSpinner />
            </Center>
          ) : (
            tableRequirementBlocks.map((requirementBlock) => {
              return (
                <Box
                  key={requirementBlock.id}
                  className={"requirements-library-grid-row"}
                  role={"row"}
                  display={"contents"}
                >
                  <SearchGridItem fontWeight={700}>{requirementBlock.name}</SearchGridItem>
                  <SearchGridItem>
                    <HStack as={"ul"} wrap={"wrap"} spacing={1}>
                      {requirementBlock.associations.map((association) => (
                        <Tag key={association} as={"li"} bg={"greys.grey03"} color={"text.secondary"} fontSize={"xs"}>
                          {association}
                        </Tag>
                      ))}
                    </HStack>
                  </SearchGridItem>
                  <SearchGridItem>
                    <UnorderedList>
                      {requirementBlock.requirements.map((requirement) => {
                        return (
                          <ListItem key={requirement.id} color={"text.secondary"} fontSize={"xs"}>
                            {requirement.label}
                          </ListItem>
                        )
                      })}
                    </UnorderedList>
                  </SearchGridItem>
                  <SearchGridItem fontSize={"sm"}>{format(requirementBlock.updatedAt, "yyyy-MM-dd")}</SearchGridItem>
                  <SearchGridItem justifyContent={"center"}>
                    <Button variant={"link"} textDecoration={"underline"}>
                      {t("ui.edit")}
                    </Button>
                  </SearchGridItem>
                </Box>
              )
            })
          )}
        </SearchGrid>
        <Flex w={"full"} justifyContent={"space-between"}>
          <PerPageSelect
            handleCountPerPageChange={handleCountPerPageChange}
            countPerPage={countPerPage}
            totalCount={totalCount}
          />
          <Paginator
            current={currentPage}
            total={totalCount}
            totalPages={totalPages}
            pageSize={countPerPage}
            handlePageChange={handlePageChange}
          />
        </Flex>

        <Button leftIcon={<Archive size={16} />} variant={"secondary"} mt={3}>
          {t("requirementsLibrary.index.seeArchivedButton")}
        </Button>
      </VStack>
    </Container>
  )
})
