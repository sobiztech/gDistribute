import React from "react";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Redirect} from "react-router-dom";
import { MainLayout } from "./layouts";
import { themeL, themeD } from "./themes";
import { mainNavigation, mainRoutes } from "./data";
import { RoutesWithLayout } from "./components";
import ContextProvider from "./contex/Contex";
import { StateProvider } from "./contex/StateProvider";
import reducer, { initialState } from "./contex/reducer";
import useToken from "./components/App/useToken";
// somthing
const WithLayout = () => {
  const [darkMode, setDarkMode] = React.useState(() => {
    const dark = localStorage.getItem("dark");
    if (dark) {
      return JSON.parse(dark);
    } else {
      return false;
    }
  });
  const darkModeToggle = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("dark", !darkMode);
  };

  const themeSwitchCofig = {
    state: darkMode,
    handler: darkModeToggle
  };
  const appliedTheme = createMuiTheme(darkMode ? themeD : themeL);
  
  const {token } = useToken();
  // const [token, settoken] = useState(false);
  if (token===null) {
    return <Redirect to='/login'  />;
  }
  return (
    <>
      <StateProvider initialState={initialState} reducer={reducer}>
        <ContextProvider>
          <BrowserRouter>
            <ThemeProvider theme={appliedTheme}>
              <RoutesWithLayout
                layout={MainLayout}
                routes={mainRoutes}
                LayoutProps={{
                  navigationData: mainNavigation,
                  themeConfig: themeSwitchCofig
                }}
              />
            </ThemeProvider>
          </BrowserRouter>
        </ContextProvider>
      </StateProvider>
    </>
  );
};

export default WithLayout;
