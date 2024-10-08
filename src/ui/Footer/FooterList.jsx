/* eslint-disable react/prop-types */
import styled from "styled-components";

const Heading = styled.h2`
  font-size: 22px;
  color: var(--color-gray-800);
`;

const Paragraph = styled.p`
  color: var(--color-gray-700);
`;

function FooterList({ className, items, headingTitle }) {
  return (
    <div className={className}>
      <Heading>{headingTitle}</Heading>
      <div className="px-4 pt-2">
        {items.map((item) => (
          <Paragraph key={item}>{item}</Paragraph>
        ))}
      </div>
    </div>
  );
}

export default FooterList;
