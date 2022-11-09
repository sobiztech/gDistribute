import { lazy } from "react";
import { NAVIGATION } from "../utils/Paths";

function importView(...args) {
  const path = args
    .map((arg) => {
      if (Array.isArray(arg)) {
        const nestPath = new Array(arg[1])
          .fill(0)
          .map(() => arg[0])
          .join("/");
        arg = nestPath;
      }
      return arg;
    })
    .join("/");
  return import(`../views/${path}.js`);
}

export const mainRoutes = [
  {
    path: NAVIGATION.DASHBOARD,
    component: lazy(() => importView(["Dashboard", 2]))
  },
  {
    path: NAVIGATION.LOADING,
    component: lazy(() => importView("loading", "Load"))
  },
  {
    path: NAVIGATION.TEST,
    component: lazy(() => importView("test", "Test"))
  },
  {
    path: NAVIGATION.BILL,
    component: lazy(() => importView("bill", "Bill"))
  },
  {
    path: NAVIGATION.ADDLOADING,
    component: lazy(() => importView("loading", "AddLoad"))
  },
  //master role path
  {
    path: NAVIGATION.ROLE,
    component: lazy(() => importView("master", "role", "Role"))
  },
  {
    path: NAVIGATION.ADDROLE,
    component: lazy(() => importView("master", "role", "AddRole"))
  },
  {
    path: NAVIGATION.EDITROLE,
    component: lazy(() => importView("master", "role", "AddRole"))
  },

  // employee master
  {
    path: NAVIGATION.EMPLOYEE,
    component: lazy(() => importView("master", "employee", "Employee"))
  },
  {
    path: NAVIGATION.ADDEMPLOYEE,
    component: lazy(() => importView("master", "employee", "AddEmployee"))
  },
  {
    path: NAVIGATION.EDITEMPLOYEE,
    component: lazy(() => importView("master", "employee", "AddEmployee"))
  },
  {
    path: NAVIGATION.SHOWEMPLOYEE,
    component: lazy(() => importView("master", "employee", "ShowEmployee"))
  }, // auth master
  {
    path: NAVIGATION.AUTH,
    component: lazy(() => importView("master", "auth", "Auth"))
  },
  {
    path: NAVIGATION.ADDAUTH,
    component: lazy(() => importView("master", "auth", "AddAuth"))
  },
  {
    path: NAVIGATION.EDITAUTH,
    component: lazy(() => importView("master", "auth", "EditAuth"))
  },
  {
    path: NAVIGATION.SHOWAUTH,
    component: lazy(() => importView("master", "auth", "ShowAuth"))
  },
  {
    path: NAVIGATION.SCALE,
    component: lazy(() => importView("item", "scale", "Scale"))
  },
  {
    path: NAVIGATION.ADDSCALE,
    component: lazy(() => importView("item", "scale", "AddScale"))
  },
  {
    path: NAVIGATION.EDITSCALE,
    component: lazy(() => importView("item", "scale", "AddScale"))
  },
  {
    path: NAVIGATION.CATEGORY,
    component: lazy(() => importView("item", "category", "Category"))
  },
  {
    path: NAVIGATION.ADDCATEGORY,
    component: lazy(() => importView("item", "category", "AddCategory"))
  },
  {
    path: NAVIGATION.EDITCATEGORY,
    component: lazy(() => importView("item", "category", "AddCategory"))
  },
  {
    path: NAVIGATION.SUBCATEGORY,
    component: lazy(() => importView("item", "subcategory", "SubCategory"))
  },
  {
    path: NAVIGATION.ADDSUBCATEGORY,
    component: lazy(() => importView("item", "subcategory", "AddSubCategory"))
  },
  {
    path: NAVIGATION.EDITSUBCATEGORY,
    component: lazy(() => importView("item", "subcategory", "AddSubCategory"))
  },
  {
    path: NAVIGATION.BRAND,
    component: lazy(() => importView("item", "brand", "Brand"))
  },
  {
    path: NAVIGATION.ADDBRAND,
    component: lazy(() => importView("item", "brand", "AddBrand"))
  },
  {
    path: NAVIGATION.EDITBRAND,
    component: lazy(() => importView("item", "brand", "AddBrand"))
  },
  {
    path: NAVIGATION.ITEM,
    component: lazy(() => importView("item", "item", "Item"))
  },
  {
    path: NAVIGATION.ADDITEM,
    component: lazy(() => importView("item", "item", "AddItem"))
  },
  {
    path: NAVIGATION.EDITITEM,
    component: lazy(() => importView("item", "item", "AddItem"))
  },
  {
    path: NAVIGATION.ITEMDETAIL,
    component: lazy(() => importView("item", "itemDetail", "ItemDetail"))
  },
  {
    path: NAVIGATION.ADDITEMDETAIL,
    component: lazy(() => importView("item", "itemDetail", "AddItemDetail"))
  },
  {
    path: NAVIGATION.EDITITEMDETAIL,
    component: lazy(() => importView("item", "itemDetail", "AddItemDetail"))
  },
  {
    path: NAVIGATION.DISCOUNT,
    component: lazy(() => importView("discount", "discount", "Discount"))
  },
  {
    path: NAVIGATION.ADDDISCOUNT,
    component: lazy(() => importView("discount", "discount", "AddDiscount"))
  },
  {
    path: NAVIGATION.EDITDISCOUNT,
    component: lazy(() => importView("discount", "discount", "AddDiscount"))
  },
  {
    path: NAVIGATION.DISCOUNTTYPE,
    component: lazy(() =>
      importView("discount", "discountType", "DiscountType")
    )
  },
  {
    path: NAVIGATION.ADDDISCOUNTTYPE,
    component: lazy(() =>
      importView("discount", "discountType", "AddDiscountType")
    )
  },
  {
    path: NAVIGATION.EDITDISCOUNTTYPE,
    component: lazy(() =>
      importView("discount", "discountType", "AddDiscountType")
    )
  },
  {
    path: NAVIGATION.PROPERTY,
    component: lazy(() => importView("property", "properties", "Property"))
  },
  {
    path: NAVIGATION.ADDPROPERTY,
    component: lazy(() => importView("property", "properties", "AddProperty"))
  },
  {
    path: NAVIGATION.EDITPROPERTY,
    component: lazy(() => importView("property", "properties", "AddProperty"))
  },
  {
    path: NAVIGATION.DEPARTMENT,
    component: lazy(() => importView("property", "department", "Department"))
  },
  {
    path: NAVIGATION.ADDDEPARTMENT,
    component: lazy(() => importView("property", "department", "AddDepartment"))
  },
  {
    path: NAVIGATION.EDITDEPARTMENT,
    component: lazy(() => importView("property", "department", "AddDepartment"))
  },
  {
    path: NAVIGATION.BRANCH,
    component: lazy(() => importView("property", "branch", "Branch"))
  },
  {
    path: NAVIGATION.ADDBRANCH,
    component: lazy(() => importView("property", "branch", "AddBranch"))
  },
  {
    path: NAVIGATION.EDITBRANCH,
    component: lazy(() => importView("property", "branch", "AddBranch"))
  },
  {
    path: NAVIGATION.VEHICLE,
    component: lazy(() => importView("vehicle", "vehicle", "Vehicle"))
  },
  {
    path: NAVIGATION.ADDVEHICLE,
    component: lazy(() => importView("vehicle", "vehicle", "AddVehicle"))
  },
  {
    path: NAVIGATION.EDITVEHICLE,
    component: lazy(() => importView("vehicle", "vehicle", "AddVehicle"))
  },
  {
    path: NAVIGATION.VEHICLETYPE,
    component: lazy(() => importView("vehicle", "vehicleType", "VehicleType"))
  },
  {
    path: NAVIGATION.ADDVEHICLETYPE,
    component: lazy(() =>
      importView("vehicle", "vehicleType", "AddVehicleType")
    )
  },
  {
    path: NAVIGATION.EDITVEHICLETYPE,
    component: lazy(() =>
      importView("vehicle", "vehicleType", "AddVehicleType")
    )
  },
  {
    path: NAVIGATION.ROUTES,
    component: lazy(() => importView("shops", "route", "RRoutes"))
  },
  {
    path: NAVIGATION.ADDROUTES,
    component: lazy(() => importView("shops", "route", "AddRoutes"))
  },
  {
    path: NAVIGATION.EDITROUTES,
    component: lazy(() => importView("shops", "route", "AddRoutes"))
  },
  {
    path: NAVIGATION.SHOPS,
    component: lazy(() => importView("shops", "shop", "Shops"))
  },
  {
    path: NAVIGATION.ADDSHOPS,
    component: lazy(() => importView("shops", "shop", "AddShops"))
  },
  {
    path: NAVIGATION.EDITSHOPS,
    component: lazy(() => importView("shops", "shop", "AddShops"))
  },
  {
    path: NAVIGATION.SHOPAUTH,
    component: lazy(() => importView("shops", "shopAuthority", "ShopAuthority"))
  },
  {
    path: NAVIGATION.ADDSHOPAUTH,
    component: lazy(() =>
      importView("shops", "shopAuthority", "AddShopAuthority")
    )
  },
  {
    path: NAVIGATION.EDITSHOPAUTH,
    component: lazy(() =>
      importView("shops", "shopAuthority", "AddShopAuthority")
    )
  },
  {
    path: NAVIGATION.RETURN,
    component: lazy(() => importView("returns", "return", "Return"))
  },
  {
    path: NAVIGATION.ADDRETURN,
    component: lazy(() => importView("returns", "return", "AddReturn"))
  },
  {
    path: NAVIGATION.EDITRETURN,
    component: lazy(() => importView("returns", "return", "AddReturn"))
  },
  {
    path: NAVIGATION.RETURNTYPE,
    component: lazy(() => importView("returns", "returnType", "ReturnType"))
  },
  {
    path: NAVIGATION.ADDRETURNTYPE,
    component: lazy(() => importView("returns", "returnType", "AddReturnType"))
  },
  {
    path: NAVIGATION.EDITRETURNTYPE,
    component: lazy(() => importView("returns", "returnType", "AddReturnType"))
  },
  {
    path: NAVIGATION.CASH,
    component: lazy(() => importView("credit", "cash", "Cash"))
  },
  {
    path: NAVIGATION.CHEQUE,
    component: lazy(() => importView("credit", "chegue", "cheque","Cheque"))
  }
];
