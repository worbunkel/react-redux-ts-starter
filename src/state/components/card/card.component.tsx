import * as React from 'react';
import './card.scss';

export enum CardType {
  NOTE = 'Note',
  REPORT = 'Report',
}

type Props = {
  width: number;
  height: number;
  title: string;
  datetime: string;
  author?: string; // For the notes
  location?: string; // For the data sources
  body: string;
  type: CardType;
  link: string;
};

const card = ({ width, height, title, datetime, author, location, body, type, link }: Props) => (
  <div
    style={{
      width: width + 'px',
      height: height + 'px',
    }}
    className="card"
  >
    <div className="upper-text">{title}</div>
    <div className="upper-text date">{datetime}</div>
    <div className="lower-text">
      {author} {location}
    </div>
    <div className="lower-text">{body}</div>
    <div className="lower-text link">
      <a href={link}>
        <div>View {type} ></div>
      </a>
    </div>
  </div>
);

export const Card: React.ComponentType<Props> = card;
