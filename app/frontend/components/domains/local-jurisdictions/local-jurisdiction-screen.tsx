import { Box, Container, Flex, Grid, GridItem, Heading, Link, Show, Text } from "@chakra-ui/react"
import { faSquareEnvelope, faSquarePhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { Descendant } from "slate"
import { TLatLngTuple } from "../../../types/types"
import { BlueTitleBar } from "../../shared/base/blue-title-bar"
import { YellowLineSmall } from "../../shared/base/decorative/yellow-line-small"
import { ReadOnlySlate } from "../../shared/base/read-only-slate"
import { JurisdictionMap } from "../../shared/module-wrappers/jurisdiction-map"
import { RouterLink } from "../../shared/navigation/router-link"
import { RouterLinkButton } from "../../shared/navigation/router-link-button"
export interface IContact {
  name: string
  firstNation?: string
  title?: string
  phone?: string
  email?: string
}

export interface ILocalJurisdiction {
  name: string
  contacts: IContact[]
}

const exampleSlate: Descendant[] = [
  {
    children: [{ text: "This is the first line of your read-only editor." }],
  },
  {
    children: [{ text: "TODO: See the exampleSlate variable and replace this placeholder with real data" }],
  },
]

// Starting position for the map
const mapPosition: TLatLngTuple = [51.505, -0.09]
const linePositions: TLatLngTuple[] = [
  [51.512, -0.091],
  [51.512, -0.114],
  [51.507, -0.114],
  [51.507, -0.091],
  [51.512, -0.091],
] // Coordinates for your custom lines

const localJurisdiction = {
  name: "Greater Victoria",
  contacts: [
    {
      name: "Firstname Lastname",
      title: "Senior Director",
      phone: "123-456-7890",
      email: "email@gov.bc.ca",
    },
    {
      name: "Firstname Lastname",
      firstNation: "Binche Whut'en",
      title: "Senior Director",
      phone: "123-456-7890",
      email: "email@gov.bc.ca",
    },
    {
      name: "Firstname Lastname",
      title: "Senior Director",
      phone: "123-456-7890",
      email: "email@gov.bc.ca",
    },
  ],
}

export const LocalJurisdictionScreen = () => {
  const { t } = useTranslation()

  const { localJurisdictionId } = useParams()

  return (
    <Flex as="main" direction="column" w="full" bg="greys.white">
      <BlueTitleBar title={localJurisdiction.name} imageSrc={"/images/local-jurisdiction-bus.svg"} />
      <Show below="md">
        <JurisdictionMap mapPosition={mapPosition} linePositions={linePositions} />
      </Show>
      <Container maxW="container.lg" py={{ base: 6, md: 16 }} px={8}>
        <Flex direction="column" gap={16}>
          <Flex gap={14}>
            <Show above="md">
              <Flex flex={1}>
                <JurisdictionMap mapPosition={mapPosition} linePositions={linePositions} />
              </Flex>
            </Show>
            <Flex as="section" flex={1} direction="column" gap={4}>
              <YellowLineSmall mt={4} />
              <Heading>{t("localJurisdiction.title")}</Heading>
              <Text>{t("localJurisdiction.description")}</Text>
              <RouterLinkButton to="#" variant="primary">
                {t("localJurisdiction.startApplication")}
              </RouterLinkButton>
            </Flex>
          </Flex>
          <Flex direction={{ base: "column", md: "row" }} gap={6}>
            <Flex direction="column" flex={3}>
              <Flex as="section" direction="column" gap={2}>
                <YellowLineSmall mt={4} />
                <Heading>{t("localJurisdiction.checklist")}</Heading>
                <ReadOnlySlate initialValue={exampleSlate} flex={1} />
              </Flex>
            </Flex>
            <Flex
              as="section"
              direction="column"
              p={6}
              flex={2}
              gap={4}
              borderRadius="lg"
              border="1px solid"
              borderColor="border.light"
            >
              <Heading>{t("localJurisdiction.lookOut")}</Heading>
              <ReadOnlySlate initialValue={exampleSlate} />
            </Flex>
          </Flex>
          <Flex as="section" direction="column" borderRadius="lg" boxShadow="md">
            <Box py={3} px={6} bg="theme.blueAlt" borderTopRadius="lg">
              <Heading color="greys.white" fontSize="xl">
                {t("localJurisdiction.contactInfo")}
              </Heading>
            </Box>
            <Flex direction="column" p={6} gap={9}>
              <Text>CUSTOM MESSAGE ABOUT CONTACTS HERE</Text>

              <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={4}>
                {localJurisdiction.contacts.map((contact, index) => (
                  <ContactGridItem key={index} contact={contact} />
                ))}
              </Grid>
            </Flex>
          </Flex>
          <RouterLink to="#">{t("localJurisdiction.didNotFind")}</RouterLink>
        </Flex>
      </Container>
    </Flex>
  )
}

interface IContactBoxProps {
  contact: IContact
}

const ContactGridItem = ({ contact }: IContactBoxProps) => {
  return (
    <GridItem
      as="section"
      colSpan={{ sm: 1, md: 1 }}
      borderRadius="sm"
      border="1px solid"
      borderColor="border.light"
      p={4}
    >
      <Heading fontSize="lg">{contact.name}</Heading>
      {contact.firstNation && `${contact.firstNation} - `}
      {contact.title}
      <Flex mt={2} direction={{ base: "column", md: "row" }} gap={2}>
        <Flex flex={1} gap={4}>
          <FontAwesomeIcon style={{ height: "32px", width: "32px" }} icon={faSquarePhone} />
          <Flex direction="column" flex={1}>
            <Heading fontSize="md">Telephone</Heading>
            <Link href={`tel:+${contact.phone}`}>{contact.phone}</Link>
          </Flex>
        </Flex>
        <Flex flex={1} gap={4}>
          <FontAwesomeIcon style={{ height: "32px", width: "32px" }} icon={faSquareEnvelope} />
          <Flex direction="column" flex={1}>
            <Heading fontSize="md">Email</Heading>
            <Link href={`mailto:${contact.email}`}>{contact.email}</Link>
          </Flex>
        </Flex>
      </Flex>
    </GridItem>
  )
}
