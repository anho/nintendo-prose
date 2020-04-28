import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { client } from "../api/client";

const NAVIGATION_ENTRY_ID = "5soaAfZh2ez37KH6byo7vJ";

const StyledHeader = styled.div`
  background-color: rgb(41, 41, 41);
  font-family: Roboto, Helvetica, Arial, sans-serif;
  color: #fff;
  text-align: center;
  font-size: 100%;
  padding: 20px 0;

  img {
    max-width: 265px;
    cursor: pointer;
  }
`;

const StyledNav = styled.nav`
  background-color: #e60012;

  .accent {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    color: #fff;
    text-align: center;
    font-size: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 40%,
      rgba(0, 0, 0, 0.08) 60%,
      rgba(0, 0, 0, 0.08) 100%
    );
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  ul {
    list-style: none;
    display: flex;
    margin: 0;
  }

  li {
    padding: 10px 20px;
    transition: background 0.2s ease;
    cursor: pointer;

    a {
      font-family: Roboto, Helvetica, Arial, sans-serif;
      font-weight: bold;
      color: #fff;
      line-height: 32px;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
      font-weight: 700;
      padding-left: 5px;
      vertical-align: middle;
      text-decoration: none;
    }

    &:hover {
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
      zoom: 1;
      background: rgba(255, 255, 255, 0.1);
    }
  }

  .divider {
    width: 1px;
    background-color: rgb(46, 46, 46);
    opacity: 0.45;
    padding: 0;
  }
`;

export class Header extends React.Component {
  state = {
    nav: null,
  };

  async componentDidMount() {
    this.setState({
      nav: await client.getEntry(NAVIGATION_ENTRY_ID, { include: 10 }),
    });
  }

  render() {
    const { nav } = this.state;

    return (
      <>
        <StyledHeader>
          <Link href="/">
            <img src="https://images.ctfassets.net/rjvs8luxqaq7/575b6I5qdHofMTPndEVKvz/ef5a61a5d2c47d8d5858bf1ed0abd049/logo.svg" />
          </Link>
        </StyledHeader>
        {nav && (
          <StyledNav>
            <div className="accent">
              <ul>
                {nav.fields.links.map(
                  ({ fields: { icon, pathname, title } }, index) => {
                    const link = (
                      <li key={`${index}-li`}>
                        <Link href={pathname}>
                          {icon ? (
                            <img
                              style={{
                                filter: "invert(100%)",
                                width: "18px",
                                marginTop: "5px",
                              }}
                              className="link-icon"
                              src={icon.fields.file.url}
                            />
                          ) : (
                            title
                          )}
                        </Link>
                      </li>
                    );
                    return index === 0 ? (
                      link
                    ) : (
                      <React.Fragment key={index}>
                        <li className="divider" />
                        {link}
                      </React.Fragment>
                    );
                  }
                )}
              </ul>
            </div>
          </StyledNav>
        )}
      </>
    );
  }
}
