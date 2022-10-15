// project import
import Routes from "routes";
import ThemeCustomization from "themes";
import ScrollTop from "components/ScrollTop";
import { createContext, useState } from "react";

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //
export const AppContext = createContext();

const App = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const data = {
    videos,
    setVideos,
    loading,
    setLoading,
  };

  return (
    <AppContext.Provider value={data}>
      <ThemeCustomization>
        <ScrollTop>
          <Routes />
        </ScrollTop>
      </ThemeCustomization>
    </AppContext.Provider>
  );
};

export default App;
