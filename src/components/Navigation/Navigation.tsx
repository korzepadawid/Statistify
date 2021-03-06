import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Tooltip } from 'antd';
import { StarOutlined, UserOutlined, ClockCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import useAuthDispatch from '../../hooks/useAppDispatch';
import { signOut } from '../../context/actions';

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.secondary};
  box-shadow: 0px -10px 10px rgba(0, 0, 0, 0.03);
  width: 100vw;
  height: 70px;
  padding: 0 6vw;
  display: flex;
  align-items: center;
  z-index: 99;

  @media (min-width: 768px) {
    height: 100vh;
    width: 90px;
    padding: 0;
    top: 0;
    left: 0;
    box-shadow: 10px 0px 10px rgba(0, 0, 0, 0.03);
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media (min-width: 768px) {
    flex-direction: column;
    height: 40vh;
  }
`;

const StyledIconButton = styled(Button)`
  border: none;
  color: ${({ theme }) => theme.grey.main};
  svg {
    font-size: 24px;
    @media (min-width: 768px) {
      font-size: 32px;
    }
  }

  &:focus,
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const StyledNavLink = styled(NavLink)`
  &.active svg {
    color: ${({ theme }) => theme.primary};
  }
`;

const Navigation = () => {
  const authDispatch = useAuthDispatch();
  const handleSignOut = () => authDispatch(signOut());

  return (
    <Wrapper>
      <IconContainer>
        <StyledNavLink to="/tracks">
          <Tooltip title="Tracks">
            <StyledIconButton shape="circle" icon={<StarOutlined />} size="large" />
          </Tooltip>
        </StyledNavLink>
        <StyledNavLink to="/artists">
          <Tooltip title="Artists">
            <StyledIconButton shape="circle" icon={<UserOutlined />} size="large" />
          </Tooltip>
        </StyledNavLink>
        <StyledNavLink to="/recents">
          <Tooltip title="Recents">
            <StyledIconButton shape="circle" icon={<ClockCircleOutlined />} size="large" />
          </Tooltip>
        </StyledNavLink>
        <Tooltip title="Logout">
          <StyledIconButton
            shape="circle"
            icon={<LogoutOutlined />}
            size="large"
            onClick={handleSignOut}
          />
        </Tooltip>
      </IconContainer>
    </Wrapper>
  );
};

export default Navigation;
