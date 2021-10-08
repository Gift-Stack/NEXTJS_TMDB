import styled from 'styled-components'

export const NavbarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(3, 37, 65);
  height: 64px;
  width: 100%;
  z-index: 10;
  transition: top 0.2s linear;
  color: #fff;
  .content {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .sub {
    display: flex;
    justify-content: space-between;
    position: relative;
    top: 0;
    left: 0;
    max-width: var(--maxPrimaryPageWidth);
    width: 100%;
    padding: 0 40px;
  }
  .nav {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-items: center;
    overflow: visible;
    ul {
      color: #fff;
      font-weight: 600;
    }
  }
`
