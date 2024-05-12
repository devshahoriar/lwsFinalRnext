import React from 'react'

const Reating = ({ p }: { p: number }) => {
  return (
      <div className="flex gap-1 text-sm text-yellow-400">
        {Array.from({ length: p }, (_, i) => (
          <span key={i}>
            <i className="fa-solid fa-star" />
          </span>
        ))}
        {Array.from({ length: 5 - Math.floor(p) }, (_, i) => (
          <span key={i}>
            <i className="fa-regular fa-star"></i>
          </span>
        ))}
      </div>
  )
}

export default Reating
