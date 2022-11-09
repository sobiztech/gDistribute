import { Dashboard } from "@material-ui/icons";
import { DICON } from "../utils/Icon";
import { NAVIGATION } from "../utils/Paths";
import CategoryIcon from "@mui/icons-material/Category";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ClassIcon from "@mui/icons-material/Class";
import ReduceCapacityIcon from "@mui/icons-material/ReduceCapacity";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import LockClockIcon from "@mui/icons-material/LockClock";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import StoreIcon from "@mui/icons-material/Store";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
export const mainNavigation = [
  {
    name: "DASHBOARD",
    icon: DICON.DASHBOARD,
    url: NAVIGATION.DASHBOARD
  },
  {
    name: "BILL",
    icon: LocalAtmIcon,
    url: NAVIGATION.BILL
  },
  {
    name: "LOADING",
    icon: DICON.VEHICLELOAD,
    url: NAVIGATION.LOADING
  },{
    name: "TEST",
    icon: DICON.VEHICLELOAD,
    url: NAVIGATION.TEST
  },
  {
    name: "CREDIT",
    icon: DICON.CREDIT,
    url: NAVIGATION.CREDIT,
    navigationData: [
      {
        name: "CASH",
        icon: DICON.CASH,
        url: NAVIGATION.CASH
      },
      {
        name: "CHAQUE",
        icon: Dashboard,
        url: NAVIGATION.CHEQUE
      }
    ]
  },
  {
    name: "ITEM",
    icon: CategoryIcon,
    url: NAVIGATION.ITEMS,
    navigationData: [
      {
        name: "ITEMDETAIL",
        icon: CategoryIcon,
        url: NAVIGATION.ITEMDETAIL
      },{
        name: "ITEM",
        icon: CategoryIcon,
        url: NAVIGATION.ITEM
      },
      {
        name: "BRAND",
        icon: Inventory2Icon,
        url: NAVIGATION.BRAND
      },
      {
        name: "SUBCATEGORY",
        icon: ProductionQuantityLimitsIcon,
        url: NAVIGATION.SUBCATEGORY
      },
      {
        name: "CATEGORY",
        icon: ClassIcon,
        url: NAVIGATION.CATEGORY
      },
      {
        name: "SCALE",
        icon: ClassIcon,
        url: NAVIGATION.SCALE
      }
    ]
  },
  {
    name: "DISCOUNT",
    icon: StoreIcon,
    url: NAVIGATION.DISCOUNTS,
    navigationData: [
      {
        name: "DISCOUNT",
        icon: AddRoadIcon,
        url: NAVIGATION.DISCOUNT
      },
      {
        name: "TYPE",
        icon: StoreIcon,
        url: NAVIGATION.DISCOUNTTYPE
      }
    ]
  },
  {
    name: "PROPERTY",
    icon: StoreIcon,
    url: NAVIGATION.PROPERTIES,
    navigationData: [
      {
        name: "BRANCH",
        icon: StoreIcon,
        url: NAVIGATION.BRANCH
      },
      {
        name: "DEPARTMENT",
        icon: StoreIcon,
        url: NAVIGATION.DEPARTMENT
      },
      {
        name: "PROPERTY",
        icon: AddRoadIcon,
        url: NAVIGATION.PROPERTY
      }
    ]
  },
  {
    name: "MASTER",
    icon: ReduceCapacityIcon,
    url: NAVIGATION.MASTER,
    navigationData: [
      {
        name: "ROLE",
        icon: NaturePeopleIcon,
        url: NAVIGATION.ROLE
      },
      {
        name: "EMPLOYEE",
        icon: SettingsAccessibilityIcon,
        url: NAVIGATION.EMPLOYEE
      },
      {
        name: "AUTH",
        icon: LockClockIcon,
        url: NAVIGATION.AUTH
      },
      {
        name: "VEHICLE",
        icon: DirectionsBusFilledIcon,
        url: NAVIGATION.VEHICLE
      }
    ]
  },
  {
    name: "SHOP",
    icon: StoreIcon,
    url: NAVIGATION.SHOP,
    navigationData: [
      {
        name: "ROUTES",
        icon: AddRoadIcon,
        url: NAVIGATION.ROUTES
      },
      {
        name: "SHOP",
        icon: StoreIcon,
        url: NAVIGATION.SHOPS
      },
      {
        name: "SHOPAUTH",
        icon: StoreIcon,
        url: NAVIGATION.SHOPAUTH
      }
    ]
  },
  {
    name: "RETURNS",
    icon: KeyboardReturnIcon,
    url: NAVIGATION.RETURNS,
    navigationData: [
      {
        name: "RETURNS",
        icon: AddRoadIcon,
        url: NAVIGATION.RETURN
      },
      {
        name: "R-TYPE",
        icon: StoreIcon,
        url: NAVIGATION.RETURNTYPE
      }
    ]
  },
  {
    name: "VEHICLE",
    icon: KeyboardReturnIcon,
    url: NAVIGATION.VEHICLES,
    navigationData: [
      {
        name: "VEHICLE",
        icon: AddRoadIcon,
        url: NAVIGATION.VEHICLE
      },
      {
        name: "VEHICLETYPE",
        icon: StoreIcon,
        url: NAVIGATION.VEHICLETYPE
      }
    ]
  }
];
