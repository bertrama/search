/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useState } from "react";
import VisuallyHidden from "@reach/visually-hidden";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import qs from "qs";

import { Button, Heading, Text, MEDIA_QUERIES } from "@umich-lib/core";
import { Icon, Modal } from "../../reusable";
import { SPACING } from "../../reusable/umich-lib-core-temp";

export default function ChooseAffiliation() {
  const { defaultAffiliation, affiliationOptions } = useSelector(
    state => state.affiliation
  );
  const [cookies] = useCookies(["affiliation"]);
  const [open, setOpen] = useState(false);

  let affiliation = defaultAffiliation;

  if (cookies["affiliation"]) {
    affiliation = cookies["affiliation"];
  }

  const label = affiliationOptions[affiliation];
  const alternativeAffiliation = affiliation === "aa" ? "flint" : "aa";
  const alternativeLabel = affiliationOptions[alternativeAffiliation];

  function changeAffiliation() {
    const parsed = qs.parse(document.location.search.substring(1), {
      allowDots: true
    });
    const withAffiliation = {
      ...parsed,
      affiliation: alternativeAffiliation
    };

    document.location.href =
      document.location.pathname +
      "?" +
      qs.stringify(withAffiliation, {
        arrayFormat: "repeat",
        encodeValuesOnly: true,
        allowDots: true,
        format: "RFC1738"
      });
  }

  return (
    <React.Fragment>
      <Button
        kind="secondary"
        css={{
          color: "white",
          border: "none",
          padding: "0"
        }}
        onClick={() => setOpen(true)}
      >
        <VisuallyHidden>Choose campus affiliation: </VisuallyHidden>
        <span
          css={{
            marginRight: SPACING["2XS"]
          }}
        >
          {label}
        </span>
        <Icon icon="expand_more" />
      </Button>
      <Modal isOpen={open} onRequestClose={() => setOpen(false)}>
        <div
          css={{
            maxWidth: "32rem"
          }}
        >
          <Button
            kind="secondary"
            onClick={() => setOpen(false)}
            small
            css={{
              position: "fixed",
              right: "1.5rem",
              top: "1.5rem",
              border: "none",
              textDecoration: "underline"
            }}
          >
            Dismiss
          </Button>
          <Heading
            size="large"
            css={{
              marginTop: "0",
              marginRight: "4rem"
            }}
          >
            Choose campus affiliation
          </Heading>
          <Text>
            Selecting an affiliation helps us connect you to available online
            materials licensed for your campus.
          </Text>

          <Button onClick={() => setOpen(false)}>Continue as {label}</Button>
          <span
            css={{
              [MEDIA_QUERIES.LARGESCREEN]: {
                margin: "0 0.5rem",
                display: "inline-block"
              },
              margin: "0.5rem",
              display: "block"
            }}
          >
            or
          </span>
          <Button kind="secondary" onClick={changeAffiliation} role="link">
            Change to {alternativeLabel}
          </Button>

          <Text css={{ marginBottom: "0" }} small>
            You can still use Library Search if you're not affiliated with
            either campus.
          </Text>
        </div>
      </Modal>
    </React.Fragment>
  );
}
