import React, { useState } from "react";
import {
  Header,
  SideNav,
  Switcher,
  HeaderName,
  HeaderPanel,
  SwitcherItem,
  SideNavItems,
  SkipToContent,
  HeaderMenuItem,
  SwitcherDivider,
  HeaderGlobalBar,
  HeaderContainer,
  HeaderMenuButton,
  HeaderNavigation,
  HeaderGlobalAction,
  HeaderSideNavItems,
} from "@carbon/react";
import { UserAvatar, Help } from "@carbon/icons-react";

import { useNavigate, NavLink } from "react-router-dom";

export const DashNavbar = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const navigate = useNavigate();

  function togglePanel() {
    setPanelOpen(!panelOpen);
  }

  function handleNavigate(path) {
    togglePanel();
    return navigate(path);
  }

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header aria-label="CHPR Information System">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName href="#" prefix="CHPR">
            IS
          </HeaderName>
          <HeaderNavigation aria-label="CHPR IS">
            <HeaderMenuItem element={NavLink} to="records">
              Records
            </HeaderMenuItem>
          </HeaderNavigation>
          <SideNav
            aria-label="Side navigation"
            expanded={isSideNavExpanded}
            isPersistent={false}
          >
            <SideNavItems>
              <HeaderSideNavItems>
                <HeaderMenuItem element={NavLink} to="records">
                  Records
                </HeaderMenuItem>
              </HeaderSideNavItems>
            </SideNavItems>
          </SideNav>

          <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="about platform">
              <Help size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Accounts and settings"
              tooltipAlignment="end"
              onClick={() => togglePanel()}
            >
              <UserAvatar size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>

          <HeaderPanel aria-label="user actions menu" expanded={panelOpen}>
            <Switcher aria-label="Switcher Container">
              <SwitcherItem
                aria-label="account"
                onClick={() => handleNavigate("account")}
              >
                Account
              </SwitcherItem>
              <SwitcherDivider />
              <SwitcherItem
                aria-label="logout"
                onClick={() => handleNavigate("/login")}
              >
                Logout
              </SwitcherItem>
            </Switcher>
          </HeaderPanel>
        </Header>
      )}
    />
  );
};
