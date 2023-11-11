import React from 'react';

export default function Image(imgElementAttributes) {
  return <img {...imgElementAttributes} src={`${process.env.CDN}${imgElementAttributes.src}`} />;
}
