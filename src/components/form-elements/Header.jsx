import React from "react";

/**
 * Header Component
 * Renders various text elements for forms: header, subheader, textBlock, filterBy label.
 * @param {string} type - The type of text element ('header', 'subheader', 'textBlock', 'filterBy')
 * @param {string} label - The main text content
 * @param {string} text - Alternate text content (often used for subheader)
 * @param {string | React.ReactNode} content - Alternate content
 * @param {object} css - Inline styles
 */
const Header = ({ type = "header", label, text, content, css = {} }) => {
  switch (type) {
    case "header":
      return (
        <h2 className="text-lg font-bold" style={css}>
          {label}
        </h2>
      );

    case "subheader":
      return (
        <p
          className="text-sm text-[var(--color-dull-text)] break-words leading-relaxed"
          style={css}
        >
          {text || label}
        </p>
      );
      return (
        <p className="text-sm font-bold text-black" style={css}>
          {text || label}
        </p>
      );

    default:
      return null;
  }
};

export default Header;
