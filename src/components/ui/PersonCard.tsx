import React, { useState } from 'react';

export interface PersonItem {
  name: string;
  role: string;
  photo: string;
  initials: string;
}

interface PersonCardProps {
  person: PersonItem;
  className?: string;
}

export const PersonCard: React.FC<PersonCardProps> = ({ person, className = '' }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article className={`person-card ${className}`}>
      <div className="person-photo-wrap">
        {!imgError ? (
          <img
            src={person.photo}
            alt={`Photo of ${person.name}`}
            loading="lazy"
            onError={() => setImgError(true)}
            className="person-photo-img"
          />
        ) : null}
        <span aria-hidden="true" className="photo-fallback">
          {person.initials}
        </span>
      </div>
      <h3>{person.name}</h3>
      <p>{person.role}</p>
    </article>
  );
};
