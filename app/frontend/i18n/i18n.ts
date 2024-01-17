import i18n from "i18next"
import { initReactI18next } from "react-i18next"

i18n.use(initReactI18next).init({
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
          organizationLabel: "Organization (optional)",
          organizationHelpText: "Lorem Ipsum Organiation help text",
          passwordLabel: "Password",
          forgotPassword: "Forgot password?",
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
          back: "Back",
          show: "Show",
          hide: "Hide",
          search: "Search",
          loading: "Loading...",
          invalidInput: "Invalid input",
          selectPlaceholder: "Select",
          selectApplicable: "Select applicable:",
          clickHere: "Click here",
          feedbackLink: "Tell us what you think",
          sortBy: "Sort by",
          resume: "Resume",
          cancel: "Cancel",
          remove: "Remove",
          save: "Save Changes",
          manage: "Manage",
          view: "View",
          totalItems: "Total Items",
          doLater: "Do this later",
        },
        jurisdiction: {
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
          },
          fields: {
            reverse_qualified_name: "Name",
            review_managers_size: "Managers",
            reviewers_size: "Reviewers",
            localityType: "Locality Type",
            permit_applications_size: "Applications Received",
            templates_used: "Templates Used",
          },
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
          applicationId: "Application ID",
        },
        requirementsLibrary: {
          index: {
            title: "Requirements Library",
            description: "List of all Requirement Blocks in the system that can be used inside Templates.",
            tableHeading: "Requirement Blocks",
            createButton: "Create New Requirement Block",
            seeArchivedButton: "See Archived",
          },
          fields: {
            name: "Name",
            associations: "Associations",
            formFields: "Form Fields",
            updatedAt: "Updated At",
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
        },
        admin: {},
        errors: {
          fetchJurisdiction: "Something went wrong fetching jurisdiction",
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
        site: {
          navBarTitle: "Building Permit Hub",
          adminNavBarTitle: "Building Permit Hub - Admin Panel",
          beta: "Beta",
          linkHome: "Navigate home",
          home: "Home",
          title: "Digital Permit Tool",
          description: "Lorem ipsum here is the site description",
          keywords: "BC, british columba, permit, portal, hub, permitting, permit application",
          activePermits: "Active Permits",
          approvedPermits: "Approved Permits",
          myAccount: "My Account",
          giveFeedback: "Give Feedback",
          error: "Something went wrong, please try refreshing the page",
          menu: "Menu",
          somethingWrong: "Something went wrong",
          breadcrumb: {
            jurisdictions: "Manage Jurisdictions",
            new: "Create New",
            invite: "Invite",
            "requirements-library": "Requirements Library",
          },
        },
      },
    },
    // ... other languages
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
})

export default i18n
