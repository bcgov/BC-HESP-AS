import {
  Box,
  BoxProps,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Image,
  InputGroup,
  Link,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react"
import { CaretRight, CheckCircle, ClipboardText, FileArrowUp, MapPin } from "@phosphor-icons/react"
import i18next from "i18next"
import { observer } from "mobx-react-lite"
import * as R from "ramda"
import React, { ReactNode, useEffect, useRef, useState } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { IJurisdiction } from "../../../models/jurisdiction"
import { useMst } from "../../../setup/root"
import { YellowLineSmall } from "../../shared/base/decorative/yellow-line-small"
import { SharedSpinner } from "../../shared/base/shared-spinner"
import { RouterLinkButton } from "../../shared/navigation/router-link-button"
import { AddressSelect } from "../../shared/select/selectors/address-select"
import { JurisdictionSelect } from "../../shared/select/selectors/jurisdiction-select"

interface ILandingScreenProps {}

export const LandingScreen = observer(({}: ILandingScreenProps) => {
  const { t } = useTranslation()
  const mailto = "mailto:" + t("site.contactEmail")
  const iNeedRef = useRef<HTMLDivElement>(null)
  const { sessionStore, userStore } = useMst()
  const { loggedIn } = sessionStore
  const { currentUser } = userStore

  const scrollToJurisdictionSearch = () => {
    iNeedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const whoFor = i18next.t("landing.whoFor", { returnObjects: true }) as string[]

  return (
    <Flex direction="column" w="full" bg="greys.white">
      <Flex
        align="center"
        h="364px"
        bgImage="/images/header-background.jpeg"
        bgPosition="center 60%"
        bgRepeat="no-repeat"
        bgSize="cover"
        bgColor="theme.blue"
      >
        <Box bgColor="theme.blueShadedLight" w="full" height="full">
          <Container maxW="container.lg" py={16} px={8}>
            <Flex
              direction="column"
              p={8}
              maxW="468px"
              bg="theme.blueShadedDark"
              color="greys.white"
              borderRadius="sm"
              borderLeft="8px solid"
              borderColor="theme.yellow"
              gap={2}
            >
              <Heading as="h1" fontSize="2xl">
                {t("landing.title")}
              </Heading>
              <Text fontSize="lg">{t("landing.intro")}</Text>
            </Flex>
          </Container>
        </Box>
      </Flex>
      <Container maxW="container.lg" py={16} px={8}>
        <Flex as="section" direction="column" gap={20}>
          <Flex gap={6} direction={{ base: "column", md: "row" }}>
            <IconBox icon={<FileArrowUp size={32} />}>{t("landing.easilyUpload")}</IconBox>
            <IconBox icon={<CheckCircle size={32} />}>{t("landing.bestPractices")}</IconBox>
            <IconBox icon={<ClipboardText size={32} />}>{t("landing.easyToFollow")}</IconBox>
          </Flex>

          <Flex gap={10} alignItems="flex-start" direction={{ base: "column", md: "row" }}>
            <Flex
              as="section"
              direction="column"
              borderRadius="lg"
              bg="theme.blueAlt"
              p={8}
              gap={6}
              color="greys.white"
              flex={1}
              minW="lg"
            >
              <Heading as="h2">{t("landing.accessMyPermits")}</Heading>
              <Text>{t("landing.accessExplanation")}</Text>
              <YellowLineSmall />
              <Flex gap={6} direction={{ base: "column", md: "row" }}>
                <RouterLinkButton
                  to={currentUser ? "/" : "/login"}
                  variant="primaryInverse"
                  icon={<CaretRight size={16} />}
                >
                  {t("site.goTo")}{" "}
                  {!currentUser || currentUser.isSubmitter ? t("site.myPermits") : t("site.adminPanel")}
                </RouterLinkButton>
              </Flex>
            </Flex>
            <VStack as="section" align="flex-start" spacing={4}>
              <Heading as="h2" variant="yellowline">
                {t("landing.whoForTitle")}
              </Heading>

              <UnorderedList spacing={1} pl={4}>
                {whoFor.map((str) => (
                  <ListItem key={str}>{str}</ListItem>
                ))}
              </UnorderedList>
              <Button variant="link" onClick={scrollToJurisdictionSearch}>
                {t("landing.iNeed")}
              </Button>
            </VStack>
          </Flex>
          <Flex gap={10} direction={{ base: "column-reverse", md: "row" }}>
            <Image src="/images/digital-permit-tools.png" borderRadius="md" w="2xs" alt="Digital permit tools" />
            <Flex as="section" direction="column" gap={4}>
              <Heading as="h3">{t("landing.whyUseTitle")}</Heading>
              <Text>{t("landing.whyUse")}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Container>
      <Container maxW="container.lg" px={8} ref={iNeedRef}>
        <VStack as="section" w="full" gap={2} mb={4} textAlign="center">
          <Heading as="h3" fontSize="4xl">
            {t("landing.iNeedLong")}
          </Heading>
          <Text>{t("landing.permitImportance")}</Text>
        </VStack>
      </Container>
      <Box bg="greys.grey03">
        <Container maxW="container.lg" py={10} px={8}>
          <VStack as="section" direction="column" gap={6}>
            <JurisdictionSearch />

            <Heading as="h3" fontSize="md" mt="8">
              {t("landing.whenNotNecessaryQ")}
            </Heading>
            <Text>{t("landing.whenNotNecessaryA")}</Text>

            <Text>
              <Trans
                i18nKey="landing.permitConnect"
                components={{
                  1: <Link href={"https://permitconnectbc.gov.bc.ca/"}></Link>,
                }}
              />
            </Text>
          </VStack>
        </Container>
      </Box>
      <Box bg="greys.white">
        <Container maxW="container.lg" py={16} px={8} textAlign="center" gap="6">
          <Heading as="h3" fontSize="md">
            {t("landing.expectQ")}
          </Heading>
          <Text>{t("landing.expectA")}</Text>
        </Container>
      </Box>
      <Box bg="greys.grey03">
        <Container maxW="container.lg" py={10} gap="2" textAlign="center">
          <Heading as="h3" fontSize="md">
            {t("landing.createdQ")}
          </Heading>
          <Text>{t("landing.createdA")}</Text>
          <Link href={mailto} isExternal mt="4">
            {t("landing.tellUsYourExperience")}
          </Link>
        </Container>
      </Box>
    </Flex>
  )
})

interface IJurisdictionSearchProps {}

const JurisdictionSearch = observer(({}: IJurisdictionSearchProps) => {
  const { t } = useTranslation()
  const { geocoderStore, jurisdictionStore } = useMst()
  const { fetchGeocodedJurisdiction, fetchingJurisdiction } = geocoderStore
  const { addJurisdiction } = jurisdictionStore
  const formMethods = useForm()
  const { control, watch, setValue } = formMethods
  const [jurisdiction, setJurisdiction] = useState<IJurisdiction>(null)
  const [manualMode, setManualMode] = useState<boolean>(false)

  const siteWatch = watch("site")

  useEffect(() => {
    // siteWatch.value may contain an empty string
    // If this is the case, let through this conditional
    // in order to let jurisdiction search fail and set manual mode
    // empty string does not count as isNil but undefined does
    if (R.isNil(siteWatch?.value)) return
    ;(async () => {
      const jurisdiction = await fetchGeocodedJurisdiction(siteWatch.value)
      if (jurisdiction) {
        setJurisdiction(jurisdiction)
      } else {
        setManualMode(true)
      }
    })()
  }, [siteWatch?.value])

  return (
    <Flex gap={6} direction={{ base: "column", md: "row" }}>
      <Flex bg="white" w="lg" p={6} gap={4} borderRadius="md">
        <FormProvider {...formMethods}>
          <form style={{ width: "100%" }}>
            <Flex direction="column" gap={6}>
              <Flex direction="column">
                <Heading as="h2" variant="yellowline" mb={2}>
                  {t("landing.where")}
                </Heading>
                <Text>{t("landing.findYourAuth")}</Text>
              </Flex>

              <Controller
                name="site"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return <AddressSelect onChange={onChange} value={value} />
                }}
              />

              {manualMode && (
                <FormControl w="full" zIndex={1}>
                  <FormLabel>{t("jurisdiction.index.title")}</FormLabel>
                  <InputGroup w="full">
                    <JurisdictionSelect
                      onChange={(value) => {
                        if (value) addJurisdiction(value)
                        setJurisdiction(value)
                      }}
                      onFetch={() => setValue("jurisdiction", null)}
                      selectedOption={{ label: jurisdiction?.reverseQualifiedName, value: jurisdiction }}
                      menuPortalTarget={document.body}
                    />
                  </InputGroup>
                </FormControl>
              )}
            </Flex>
          </form>
        </FormProvider>
      </Flex>
      <Center
        bg={jurisdiction ? "theme.blueAlt" : "greys.white"}
        minH={243}
        w="lg"
        gap={4}
        borderRadius="md"
        color={jurisdiction ? "greys.white" : "theme.secondary"}
        _hover={{
          background: jurisdiction ? "theme.blue" : null,
          transition: "background 100ms ease-in",
        }}
      >
        {jurisdiction ? (
          <VStack
            gap={8}
            className="jumbo-buttons"
            w="full"
            height="full"
            p={6}
            alignItems="center"
            justifyContent="center"
          >
            <Text textTransform={"uppercase"} fontWeight="light" fontSize="sm">
              {jurisdiction.qualifier}
            </Text>
            <HStack gap={2}>
              <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                {jurisdiction?.name}
              </Text>
              <Box color="theme.yellow">
                <CheckCircle size={32} />
              </Box>
            </HStack>
            <RouterLinkButton
              variant="ghost"
              color="greys.white"
              to={`/jurisdictions/${jurisdiction.slug}`}
              icon={<CaretRight size={16} />}
              textDecoration={"underline"}
              _hover={{
                background: "none",
              }}
            >
              {t("landing.learnRequirements")}
            </RouterLinkButton>
          </VStack>
        ) : (
          <VStack gap={6}>
            <Center h={50}>{fetchingJurisdiction ? <SharedSpinner /> : <MapPin size={40} />}</Center>
            <Text fontStyle="italic" textAlign="center">
              {t("landing.reqsVary")}
            </Text>
          </VStack>
        )}
      </Center>
    </Flex>
  )
})

interface IIconBoxProps extends BoxProps {
  icon: ReactNode
  children: ReactNode
}

const IconBox = ({ icon, children, ...rest }: IIconBoxProps) => {
  return (
    <Box p={4} borderRadius="lg" bg="theme.blueLight" color="theme.blueAlt" flex={1} {...rest}>
      <Flex gap={4} align="center" h="full">
        <Box>{icon}</Box>
        <Text fontSize="md" fontWeight="bold">
          {children}
        </Text>
      </Flex>
    </Box>
  )
}
