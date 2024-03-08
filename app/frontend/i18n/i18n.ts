import i18n from "i18next"
import { initReactI18next } from "react-i18next"

export const defaultNS = "translation"
export const fallbackNS = "translation"

const options = {
  resources: {
    /* English translations */
    en: {
      translation: {
        auth: {
          login: "Login",
          logout: "Logout",
          submit: "Submit",
          or: "or",
          bceid_login: "Login with BCeID",
          accept_invite_with_bceid: "Connect with BCeID",
          role: "Role",
          loginInstructions: "Enter the username for your Digital Building Permit Account below.",
          usernameLabel: "Username",
          emailLabel: "Email address",
          userFirstNameLabel: "First Name",
          userLastNameLabel: "Last Name",
          organizationLabel: "Organization (optional)",
          organizationHelpText: "Lorem Ipsum Organiation help text",
          passwordLabel: "Password",
          forgotPassword: "Forgot password?",
          passwordTooWeak: "Password too weak",
          register: "Register for account",
          registerButton: "Register",
          forgotPasswordInstructions:
            "Please fill in your username and we'll send instructions on how to reset your password to the email address associated to your account.",
          resetPassword: "Reset Password",
          registerInstructions:
            "Please fill out the following registration form to create your account. Ensure all information is accurate and up-to-date.",
          certifiedProfessional: "I am a certified professional",
          passwordTitle: "Set a Password",
          passwordRequirements:
            "Must be between 8 - 64 characters long, at least one uppercase, one lowercase, one special character, and one number.",
          alreadyHaveAccount: "Already have an account?",
          checkYourEmail: "Please check your email inbox for the confirmation email to activate your account.",
        },
        landing: {
          title: "Building Permit Hub",
          intro:
            "Co-created with a variety of pilot local jurisdictions for the people of B.C. to help create more homes faster.",
          easilyUpload: "Easily upload all your required building permitting information such as pdf files",
          bestPractices: "Get best-practices from  provincial and local jurisdictions",
          easyToFollow: "Easy to follow instructions of what is required for your building permit application",
          accessMyPermits: "Access My Housing Building Permits",
          accessExplanation:
            "Digital Building Permit Account uses the same or different login as BCeID. Need to explain this to users clearly what they’re logging in with.",
          whoForTitle: "Who is this for?",
          whoFor: [
            "I want to build a houseplex",
            "I want to build a small building on my property",
            "Industry professionals",
            "Building Permits in BC for Housing",
          ],
          iNeed: "What do I need?",
          whyUseTitle: "Why use this tool?",
          whyUse:
            "This is a housing building permitting tool pilot to help all communities in BC receive and process building permit applications faster and more efficiently.  This tool links into the single application portal for Provincial natural resource permits that may also be required for some housing building permit applications.",
          iNeedLong: "What do I need for a housing building permit?",
          reqsVary:
            "Permit requirements vary by local jurisdiction and depend on the geography of the surrounding location.",
          whereTitle: "Where",
          findAuthority: "Find your local building permitting authority.",
          locationOr: "Location or Civic Address",
          withinXRiver: "Within x km of a river",
          withinXForest: "Within x km of a forest",
          withinXProtected: "Within x km of a protected land",
          whatType: "What type of housing are you building?",
          dontSee: "Don't see the type that you're looking for?",
          whenNotNecessaryQ: "When is a permit not necessary?",
          whenNotNecessaryA:
            "Projects that are for the interior of your home, minor repairs. Things like fence, sheds may depend on local jurisdiction and geography.",
          expectQ: "What can I expect?",
          expectA: "After submitting your permit application through this tool, lorem ipsum dolor sit amet.",
          createdQ: "Why was this tool created?",
          createdA:
            "Becoming a North American leader of digital permitting and construction by digitally integrating permit systems and tools across the housing development sector across B.C. is a commitment of the 2023 Ministry of Housing Homes for People Plan.",
        },
        ui: {
          tip: "Tip",
          manage: "Manage",
          preview: "Preview",
          back: "Back",
          backHome: "Back to home",
          yes: "Yes",
          no: "No",
          show: "Show",
          hide: "Hide",
          change: "Change",
          search: "Search",
          loading: "Loading...",
          invalidInput: "Invalid input",
          invalidEmail: "Invalid email",
          selectPlaceholder: "Select",
          selectApplicable: "Select applicable:",
          clickHere: "Click here",
          clickToEdit: "Click to edit",
          clickToShow: "Click to show",
          feedbackLink: "Tell us what you think",
          sortBy: "Sort by",
          resume: "Resume",
          cancel: "Cancel",
          remove: "Remove",
          save: "Save Changes",
          onlySave: "Save",
          done: "Done",
          view: "View",
          totalItems: "Total Items",
          doLater: "Do this later",
          add: "Add",
          edit: "Edit",
          optional: "(optional)",
          archive: "Remove and Archive",
          restore: "Restore",
          seeArchivedButton: "See Archived",
          seeUnarchivedButton: "See Unarchived",
          never: "never",
          submit: "Submit",
          select: "Select",
          notAvailable: "Not available yet",
          isRequired: "{{field}} is required",
          use: "Use",
          publish: "Publish",
          neverMind: "Never mind",
          download: "Download",
          expandAll: "Expand all",
          collapseAll: "Collapse all",
          toTop: "Go to top",
          confirm: "Confirm",
          close: "Close",
          asc: "Ascending",
          desc: "Descending",
          returnHome: "Return to home",
        },
        contact: {
          fields: {
            name: "Name",
            title: "Title",
            department: "Department",
            email: "Email",
            phoneNumber: "Phone no.",
            extension: "Extension",
          },
        },
        jurisdiction: {
          edit: {
            displayDescriptionLabel: "Jurisdiction Description (public)",
            addDescription: "Click to add a description",
            displayChecklistLabel: "Permit Application Checklist (public)",
            addChecklist: "Click to add a permit application checklist",
            displayLookOutLabel: '"Look Out" Section (public)',
            addLookOut: 'Click to add a "Look Out" section',
            displayContactSummaryLabel: "Contact Summary Section (public)",
            addContactSummary: "Click to add a Contact Summary section",
            clickToEditContacts: "Click to edit contacts",
            clickToShowContacts: "Click to show contacts as they will be seen",
            clickToEditMap: "Click to edit map coordinates",
            clickToShowMap: "Click to show map as it will be seen",
          },
          new: {
            title: "Create New Jurisdiction",
            createButton: "Create Jurisdiction",
            nameLabel: "Name of local jurisdiction",
            nextStep: "The next step is to invite users",
          },
          index: {
            title: "Manage Jurisdictions",
            description: "Below is a list of all jurisdictions in the system",
            createButton: "Create New Jurisdiction",
            tableHeading: "Local Governments",
            users: "Users",
            about: "About",
          },
          fields: {
            reverseQualifiedName: "Name",
            reviewManagersSize: "Managers",
            reviewersSize: "Reviewers",
            localityType: "Locality Type",
            permitApplicationsSize: "Applications Received",
            templatesUsed: "Templates Used",
            mapPosition: "Map position",
          },
          lat: "Latitude",
          lng: "Longitude",
          title: "Local Housing Permits",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          checklist: "Checklist",
          lookOut: "Things to look out for",
          startApplication: "Start a Permit Application",
          contactInfo: "Contact information",
          didNotFind: "I didn't find what I was looking for",
          viewAs: "View As",
          name: "Name",
          managers: "Managers",
          reviewers: "Reviewers",
          applicationsReceived: "Applications Received",
          templatesUsed: "Templates Used",
        },
        permitApplication: {
          indexTitle: "My Active Permits",
          start: "Start a Permit Application",
          drafts: "Draft Permits",
          startedOn: "Started on",
          lastUpdated: "Last updated",
          seeBestPracticesLink: "See best practices for",
          ask: "Ask a question",
          pidLabel: "Parcel Identification (PID) No.",
          addressLabel: "Address",
          viewed: "Viewed",
          notViewed: "New",
          status: {
            draft: "Draft Permits",
            submitted: "Submitted Permits",
          },
          columns: {
            number: "Application #",
            permit_classification: "Types",
            submitter: "Submitter",
            submitted_at: "Submitted At",
            viewed_at: "Viewed At",
            status: "Status",
          },
          submissionInbox: {
            title: "Submissions Inbox",
            tableHeading: "Permit Applications",
            submissionsSentTo: "All submissions are sent to: {{email}}",
          },
          fields: {
            number: "Application #",
          },
          new: {
            locationHeading: "Location for permit",
            permitTypeHeading: "Permit type",
            workTypeHeading: "Work Type",
            submitted: "Your application has been submitted",
            hearBack: "If you don't hear back by Lorem days,",
            contactInstruction:
              "here are instructions of what to do and the local government building permit to contact. Instruction text here lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            whatsNextTitle: "What's next?",
            ready: "Ready to submit this application?",
            bySubmitting: "By submitting this application",
            confirmation: "Lorem ipsum submitting blah de blah filler lorem",
            yourReference: "For reference, your BC Building Permit Hub Application # is {{ number }}",
            whatsNext:
              "Lorem ipsum what to expext next. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            emailed:
              "A confirmation email has also been sent to the applicant and {{ jurisdictionName }}'s building permit office",
          },
          edit: {
            saveDraft: "Save and finish later",
            submit: "Submit application",
            permit: "Permit",
            fullAddress: "Full Address",
            pidPin: "PID / PIN",
            clickToWriteNickname: "Click to write a nickname",
          },
          show: {
            wasSubmitted: "Application was submitted on {{ date }}",
            contactsSummary: "Contacts Summary",
            downloadApplication: "Download application",
            contactSummaryHeading: "List of all contacts on this application",
          },
        },
        requirementsLibrary: {
          associationsInfo: "Sections, tags, etc...",
          index: {
            title: "Requirements Library",
            description: "List of all Requirement Blocks in the system that can be used inside Templates.",
            tableHeading: "Requirement Blocks",
            createButton: "Create New Requirement Block",
          },
          fieldsDrawer: {
            formFields: "Form Fields",
            useButton: "Use",
            dummyOption: "Option",
          },
          modals: {
            displayDescriptionLabel: "Instruction/Description (public)",
            addDescriptionTrigger: "Add instructions/description for this block",
            create: {
              triggerButton: "Create New Requirement Block",
              title: "New Requirement Block",
            },
            edit: {
              title: "Edit Requirement Block",
            },
            clickToWriteDisplayName: "Click to write display name",
            blockSetupTitle: "Block Setup",
            internalUse: "For internal use only",
            configureFields: "Configure the form fields below that submitters will see:",
            noFormFieldsAdded: "No form fields have been added yet, start by clicking the Add button.",
            defaultRequirementLabel: "Label",
            addHelpText: "Add help text",
            helpTextPlaceHolder: "Help text",
            optionalForSubmitters: "This field is optional for submitters",
            optionsMenu: {
              triggerButton: "Options",
              remove: "Remove",
              conditionalLogic: "Conditional Logic",
              dataValidation: "Data Validation",
            },
            addOptionButton: "Add another option",
            editWarning: "Any changes made here will be reflected in all templates that use this requirement block.",
          },
          fields: {
            name: "Name",
            description: "Description",
            associations: "Associations",
            formFields: "Form Fields",
            updatedAt: "Updated At",
            requirementSku: "Requirement SKU",
          },
          fieldDescriptions: {
            description: "Provide some context for admins and managers for this fieldset.",
            associations: "Assign a tag to help organize and find this requirement block easier.",
            requirementSku: "Generated unique identifier",
          },
          requirementTypeLabels: {
            shortText: "Short Text",
            address: "Address",
            date: "Date",
            number: "Number",
            textArea: "Text Area",
            radio: "Select Radio Options",
            multiOptionSelect: "Multi-Select Checkboxes",
            select: "Single Select Dropdown",
            signature: "Signature",
            generalContact: "General Contact",
            fileUpload: "File Upload",
            phone: "Phone",
            email: "E-mail",
            energyStepCode: "Energy Step Code",
          },
          descriptionMaxLength: "(Max length: 250 characters)",
          unitLabels: {
            option: {
              noUnit: "(no unit)",
              mm: "mm - millimeters",
              cm: "cm- centimeters",
              m: "m - meters",
              in: "in - inches",
              ft: "ft - feet",
              mi: "mi - miles",
              sqm: "sqm - sq meters",
              sqft: "sqft - sq feet",
            },
            display: {
              noUnit: "(no unit)",
              mm: "millimeters (mm)",
              cm: "centimeters (cm)",
              m: "meters (m)",
              in: "inches (in)",
              ft: "feet (ft)",
              mi: "miles (mi)",
              sqm: "sq meters (sqm)",
              sqft: "sq feet (sqft)",
            },
          },
        },
        stepCode: {
          title: "Step Code Auto-Compliance Tool",
          subTitle: "Automatically generate your BC Energy Step Code Compliance Report",
          checklistGuide: "See Checklist Guide",
          saveAndGoBack: "Save and Go Back",
          back: "Back to Permit Application",
          restart: "Restart",
          info: {
            title: "BC Step Code Compliance Checklist - Part 9 Buildings",
            energy: "Energy Step Code",
            zeroCarbon: "Zero Carbon Step Code",
            performancePaths: {
              title: "For Performance Paths:",
              ers: "9.36.6. BC Energy Step Code ERS",
              necb: "9.36.6. BC Energy Step Code NECB",
              passive: "9.36.6. Passive House",
              stepCode: "9.36.5 BC Energy Step Code",
            },
            more: {
              prompt: "More details can be found at ",
              link: "energystepcode.ca",
            },
          },
          drawingsWarning: {
            title: "Before you start",
            description:
              "Please make sure you have finished uploading all your finalized drawings before generating the report. If you make changes to your uploaded drawings after import, you will need to go through this Step Code Auto-Compliance Tool again.",
          },
          import: {
            title: "Import",
            selectFile: "Select .h2k file",
            compliancePath: {
              label: "BC Building Code Performance Compliance Path:",
              select: "Select",
              options: {
                step_code_ers: "9.36.6 BC Energy Step Code ERS",
                step_code_necb: "9.36.6 BC Energy Step Code NECB",
                passive_house: "9.36.6 Passive House",
                step_code: "9.36.5 BC Energy Step Code",
              },
            },
            districtEnergyEF: "District Energy EF",
            districtEnergyConsumption: "District Energy Consumption",
            otherGhgEf: "Other GHG EF",
            otherGhgConsumption: "Other GHG Consumption",
            create: "Create",
            addData: "Add Data",
          },
          index: {
            heading: "Step Codes",
            newStepCode: "New Step Code",
          },
        },
        stepCodeChecklist: {
          edit: {
            heading: "BC Step Code Compliance Checklist - Part 9 Buildings",
            notice: "Relevant data fields below has been filled in for you by Auto-Compliance.",
            projectInfo: {
              stages: {
                pre_construction: "Pre Construction",
                mid_construction: "Mid Construction",
                as_built: "As Built",
              },
              heading: "A: Project Information",
              permitNum: "Building Permit #",
              builder: "Builder",
              address: "Project Address",
              postalCode: "Postal Code",
              jurisdiction: "Municipality / District",
              pid: "PID or legal description",
              buildingType: {
                label: "Building Type",
                placeholder: "Select",
                options: {
                  laneway: "Laneway House",
                  single_detached: "Single Detached",
                  double_detached: "Double/Semi-detached (non-MURB)",
                  row: "Row House (non-MURB)`",
                  multi_plex: "Multi-plex (non-MURB)",
                  single_detached_with_suite: "Single Detatched w/Secondary Suite",
                  low_rise_murb: "Low-Rise MURB",
                  stacked_duplex: "Stacked Duplex (MURB)",
                  triplex: "Triplex (MURB)",
                  retail: "Retail",
                  other: "Other",
                },
              },
              select: "Select",
              dwellingUnits: "Number of Dwelling Units",
            },
            codeComplianceSummary: {
              heading: "B: Code Compliance Summary",
              required: "Required",
              compliancePath: {
                label: "BC Building Code Performance Compliance Path:",
                options: {
                  step_code_ers: "9.36.6 BC Energy Step Code ERS",
                  step_code_necb: "9.36.6 BC Energy Step Code NECB",
                  passive_house: "9.36.6 Passive House",
                  step_code: "9.36.5 BC Energy Step Code",
                },
              },
              energyStepCode: {
                heading: "Energy Step Code",
                stepRequired: "Step Required",
                stepProposed: "Proposed Step Achieved",
                steps: {
                  "3": "3",
                  "4": "4",
                  "5": "5",
                },
              },
              zeroCarbonStepCode: {
                heading: "Zero Carbon Step Code",
                stepRequired: "Level Required",
                stepProposed: "Proposed Step Achieved",
                steps: {
                  "1": "EL 1",
                  "2": "EL 2",
                  "3": "EL 3",
                  "4": "EL 4",
                },
              },
              planInfo: {
                title: "Based on info provided by the builder & the following drawings:",
                author: "Plan Author",
                version: "Plan Version",
                date: "Plan Date",
              },
            },
            completedBy: {
              heading: "C: Completed By",
              description:
                "EA's working in teams may designate a contact person for this permit.  This person may or may not be the modeler.  The registration numbers must match the actual modelers registration.",
              energyAdvisor: "Energy Advisor",
              name: "Full name",
              date: "Date",
              company: "Company name",
              organization: "Service organization",
              phone: "Phone",
              energyAdvisorId: "Energy advisor ID#",
              address: "Address",
              email: "Email",
              codeco: "CODECO placed in Field 8 of H2K",
              yes: "Yes",
              no: "No",
              pFile: "P File #",
            },
            energyPerformanceCompliance: {
              heading: "D: Energy Performance Compliance",
              proposedHouseEnergyConsumption: "Proposed House Energy Consumption:",
              referenceHouseRatedEnergyTarget: "Reference House Rated Energy Target:",
              energyUnit: "GJ/year",
              hvac: "HVAC",
              dwhHeating: "DWH Heating",
              sum: "SUM",
              calculationAirtightness:
                "The airtightness value used in the energy model calculations for the Proposed house is:",
              calculationTestingTarget: "OR Testing Target",
              compliance: "The above calculation was performed in compliance with Subsection 9.36.5. of Division B",
              airtightnessValue: {
                select: "Select",
                options: {
                  two_point_five: "2.5 ACH",
                  three_point_two: "3.2 ACH",
                },
              },
              epcTestingTargetType: {
                select: "Select",
                options: {
                  ach: "ACH@50Pa",
                  nla: "NLA@10Pa",
                  nlr: "NLR L/s/m2",
                },
              },
            },
            energyStepCodeCompliance: {
              heading: "F: 9.36.6 Energy Step Code Compliance",
              proposedConsumption: "Proposed House Rated Energy Consumption",
              refConsumption: "Reference House Rated Energy Target",
              consumptionUnit: "GJ/year",
              proposedMetrics: "Proposed House Metrics",
              requirement: "Proposed Step Requirement",
              results: "Proposed House Results",
              passFail: "Proposed House Pass or Fail",
              step: "Step Code Level",
              meui: "Mechanical Energy Use Intensity (MEUI)",
              meuiUnits: {
                numerator: "kWh",
                denominator: "m²·yr",
              },
              max: "(max)",
              min: "(min)",
              meuiImprovement: "% Improvement",
              tedi: "Thermal Energy Demand Intensity (TEDI)",
              tediUnits: {
                numerator: "kWh",
                denominator: "m²·yr",
              },
              hlr: "% Heat Loss Reduction",
              ach: "Airtightness in Air Changes per Hour at 50 Pa differential",
              achUnits: {
                numerator: "ACH",
                denominator: "@50Pa",
              },
              nla: "Normalized Leakage Area (NLA₁₀)",
              nlaUnits: {
                numerator: "10 Pa",
                denominator: "cm²/m²",
              },
              nlr: "Normalized Leakage Rate (NLR₅₀)",
              nlrUnits: "L/s/m²",
              requirementsMet: "Step Code Requirements Met:",
              otherData: {
                header: "Other Data",
                software: "Software Used",
                softwareVersion: "Software Version",
                heatedFloorArea: "Heated floor area",
                volume: "Building Volume",
                surfaceArea: "Building Surface Area",
                fwdr: "FWDR",
                climateLocation: "Climate data (Location)",
                hdd: "Degree Days Below 18°C (HDD)",
                spaceCooled: "% Of Space Cooled",
              },
            },
            zeroCarbonStepCodeCompliance: {
              heading: "G: Zero Carbon Step Code Compliance",
              proposedMetrics: "Proposed House Metrics",
              stepRequirement: "Proposed Step Requirement",
              result: "Proposed House Result",
              passFail: "Proposed House Pass or Fail",
              step: "Zero Carbon Step Code Level",
              max: "Max",
              min: "Min",
              ghg: {
                label: "Total GHG",
                units: {
                  numerator: "kg CO₂ₑ",
                  denominator: "yr",
                },
              },
              co2: {
                title: "CO₂ₑ per floor area with max:",
                perFloorArea: {
                  label: "CO₂ₑ per floor area",
                  units: {
                    numerator: "kg CO₂ₑ",
                    denominator: "m²·yr",
                  },
                },
                max: {
                  label: "CO₂ₑ max",
                  units: "kg CO₂ₑ",
                },
              },
              prescriptive: {
                title: "Prescriptive:",
                heating: "Heating",
                hotWater: "Hot Water",
                other: "All building systems, equipment, and appliances",
              },
              requirementsMet: "Target reached:",
            },
            complianceGrid: {
              requirementsMetTag: {
                pass: "Pass",
                fail: "Fail",
              },
            },
          },
        },
        home: {
          jurisdictionsTitle: "Jurisdictions",
          jurisdictionsDescription: "Invite or remove Managers or Reviewers in the Building Permit Hub System.",
          permitTemplateCatalogueTitle: "Permit Templates Catalogue",
          permitTemplateCatalogueDescription:
            "Create and manage permit templates for each permit type that Local Gov can use as a standardized base.",
          requirementsLibraryTitle: "Requirements Library",
          requirementsLibraryDescription:
            "Create and manage requirement blocks that can be used inside of permit templates.",
          contentManagementTitle: "Content Management",
          contentManagementDescription: "Customize content in one centralized place.",
          superAdminTitle: "Admin Home",
          submissionsInboxTitle: "Submissions Inbox",
          submissionsInboxDescription: "View all submitted building permit applications.",
          permitsTitle: "Digital Building Permits",
          permitsDescription:
            "Control what permit types you want available for submitters to apply with on BC Building Permit Hub.",
          userManagementTitle: "User Management",
          userManagementDescription: "Invite or remove Managers or Reviewers in the Building Permit Hub System.",
          auditLogTitle: "Audit Log",
          stepCodes: "Step Codes",
        },
        admin: {},
        errors: {
          fetchJurisdiction: "Something went wrong fetching the jurisdiction",
          fetchPermitApplication: "Something went wrong fetching the permit application",
          fetchPermitTypeOptions: "Something went wrong fetching the permit type options",
          fetchActivityOptions: "Something went wrong fetching the activity options",
          workTypeNotFound: "Work type not found",
          fetchWorkTypeOptions: "Something went wrong fetching the work type options",
          fetchRequirementTemplate: "Something went wrong fetching the requirement template",
          fetchTemplateVersion: "Something went wrong fetching the template version",
          fetchTemplateVersions: "Something went wrong fetching template versions",
          fetchBuildingPermits: "Something went wrong fetching building permits",
          fetchBuildingPermit: "Something went wrong fetching building permit",
          fetchBuildingPermitJurisdictionChanges: "Something went wrong fetching building permit jurisdiction changes",
          fetchOptions: "Something went wrong fetching options",
          fetchJurisdictionTemplateVersionCustomization:
            "Something went wrong fetching jurisdiction template version customization",
        },
        user: {
          fields: {
            role: "Role",
            email: "Email",
            name: "Name",
            createdAt: "Date Added",
            lastSignIn: "Last Sign In",
          },
          index: {
            tableHeading: "User Accounts",
            inviteButton: "Invite users",
          },
          changeRole: "Change Role",
          addUser: "Add more emails",
          invite: "Invite",
          firstName: "First Name",
          lastName: "Last Name",
          oldPassword: "Old Password",
          newPassword: "New Password",
          myProfile: "My Profile",
          inviteTitle: "Invite Users",
          inviteSuccess: "Invite sent!",
          inviteError: "Email taken",
          sendInvites: "Send Invites",
          acceptInvitation: "Accept Invitation to",
          acceptInstructions: "Enter your login and other user info below to finalize your account creation.",
          rolesAndPermissions: "User Roles & Permissions",
          inviteInstructions:
            "Enter the email addresses of whom you wish to invite below.  For details about permissions for each role, please see",
          // Leave in snake case so we can use: t(`user.roles.${role}`)

          roles: {
            submitter: "submitter",
            review_manager: "review manager",
            reviewer: "reviewer",
            super_admin: "super admin",
          },
        },
        requirementTemplate: {
          edit: {
            clickToWriteDescription: "Click to write description",
            title: "Permit Application Builder",
            dndTitle: "Drag to reorder",
            addSectionButton: "Add Section",
            addRequirementButton: "Add Requirement",
            saveDraft: "Save as Draft",
            closeEditor: "Close Editor",
            sectionsSidebarTitle: "Contents",
            reorderButton: "Reorder",
            removeConfirmationModal: {
              title: "Are you sure you want to remove this section?",
              body: "Any requirements inside this section will also be removed along with it.",
            },
            emptyTemplateSectionText: "Start by clicking the Add Section button",
            goToTop: "Go to top",
            collapseAll: "Collapse All",
            scheduleModalTitle: "Publish permit?",
            scheduleModalBody:
              "Once you publish, local governments and submitters will be able to see and use this new version of the form.",
            scheduleModalHelperText: "Schedule to publish (at 00:01 PST)",
            scheduleModalCancelMessage: "Changes were not scheduled.",
            errorsBox: {
              title: "There are {{count}} fields with errors on the page.",
              instructions: "Please fix the following before submitting:",
            },
          },
          fields: {
            status: "Status",
            permitType: "Permit Type",
            activity: "Work Type",
            description: "Description",
            currentVersion: "Current Version",
            jurisdictionsSize: "Used By",
          },
          status: {
            published: "Published",
            scheduled: "Scheduled",
            draft: "Draft",
            deprecated: "Deprecated",
          },
          index: {
            tableHeading: "Templates",
            title: "Permit Templates Catalogue",
            description:
              "List of all permit templates in the system that’s been created by the Super Admin. Only Published templates will be visible to jurisdictions and submitters.",
            createButton: "Create new template",
            seeArchivedButton: "See Archived",
          },
          new: {
            title: "Create New Template",
            typePrompt: "What kind of building permit is this?",
            descriptionHelpText:
              "Provide some context for managers and admin on what kinds of buildings this permit is meant for.",
            createButton: "Create template",
          },
          versionSidebar: {
            triggerButton: "Versions",
            title: "Template Versions",
            subtitlePrefix: "For:",
            viewTemplateButton: "View template",
            resumeDraftButton: "Resume draft",
            unscheduleButton: "Unschedule",
            listTitles: {
              published: "Published",
              draft: "Drafts",
              scheduled: "Scheduled",
              deprecated: "Deprecated",
            },
            lastUpdated: "Last updated",
          },
        },
        digitalBuildingPermits: {
          index: {
            title: "Digital Building Permits",
            selectPermit: "Select a digital permit:",
            workType: "Work Type",
            manageButton: "Manage",
            lastUpdated: "Last updated",
            emptyPermitsText:
              "No available building permits of the selected work type. Please wait for updates from the Ministry of Housing.",
          },
          edit: {
            requirementBlockSidebar: {
              description:
                "Local jurisdictions can change building permit applications to fit their needs by adding elective fields and offering submitters practical tips. This helps make the application forms reflect the distinct regulations, standards, and requirements of each jurisdiction, so applicants provide the correct information needed by their area.",
              tipLabel: "Tip for submitters (optional)",
              manageFieldsButton: "Manage elective field(s)",
              resetToDefaults: "Reset to defaults",
              selectFieldsTitle: "Select elective fields",
              electiveFormFields: "Elective Form Fields",
              addSelectedButton: "Add selected",
            },
          },
        },
        site: {
          title: "Building Permit Hub",
          titleLong: "BC Building Permit Hub",
          adminNavBarTitle: "Building Permit Hub - Admin Panel",
          beta: "Beta",
          linkHome: "Navigate home",
          didYouFind: "Did you find what you were looking for?",
          territorialAcknowledgement:
            "The B.C. Public Service acknowledges the territories of First Nations around B.C. and is grateful to carry out our work on these lands. We acknowledge the rights, interests, priorities, and concerns of all Indigenous Peoples - First Nations, Métis, and Inuit - respecting and acknowledging their distinct cultures, histories, rights, laws, and governments.",
          home: "Home",
          contact: "Contact us",
          help: "Help",
          aboutTitle: "About",
          disclaimerTitle: "Disclaimer",
          copyrightHolder: "Government of British Columbia.",
          description: "Lorem ipsum here is the site description",
          keywords: "BC, british columba, permit, portal, hub, permitting, permit application",
          activePermits: "Active Permits",
          approvedPermits: "Approved Permits",
          myAccount: "My Account",
          giveFeedback: "Give Feedback",
          error: "Something went wrong, please try refreshing the page",
          menu: "Menu",
          somethingWrong: "Something went wrong",
          pageNotFound: "404 - The page you are looking for could not be found",
          seeConsoleForDetails: "See the browser console for details",
          breadcrumb: {
            profile: "Profile",
            jurisdictions: "Manage Jurisdictions",
            new: "Create New",
            invite: "Invite",
            templateVersions: "Template Versions",
            requirementsLibrary: "Requirements Library",
            requirementTemplates: "Permit Templates Catalogue",
            edit: "Edit",
            users: "Users",
            editTemplate: "Edit template",
            editPermit: "Edit Permit",
            permitApplications: "Permit Applications",
            submissionInbox: "Submission Inbox",
            configuration: "Configure Jurisdiction",
            sucessfulSubmission: "Application submitted",
            stepCodes: "Step Codes",
            digitalBuildingPermits: "Digital Building Permits",
          },
          questionSupport: "Question Support",
        },
      },
    },
    // ... other languages
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
}

i18n.use(initReactI18next).init(options)

export type TTranslationResources = (typeof options)["resources"]

export default i18n
