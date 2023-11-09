import React from 'react';
import ImageLoader from './imageLoader';

function ShipSelection({ onShipSelect, selectedShip, selectedShipQuantities, selectedShipMessage, startGame  }) {
    const ships = [
      { name: 'ShipOne', length: 1, imageSrc: 'http://85.193.80.60:4000/image/one.png', className: 'ship-one-icon' },
      { name: 'ShipTwo', length: 2, imageSrc: 'http://85.193.80.60:4000/image/two.png', className: 'ship-two-icon' },
      { name: 'ShipThree', length: 3, imageSrc: 'http://85.193.80.60:4000/image/three.png', className: 'ship-three-icon' },
      { name: 'ShipFour', length: 4, imageSrc: 'http://85.193.80.60:4000/image/four.png', className: 'ship-four-icon' },
    ];
  
    return (
      <div className='ship-selection-head'>
        <button className='button-start' onClick={startGame}>Начать игру</button>
      <div className="ship-selection">
        <h3 className='select-name-ship'>{selectedShipMessage}</h3>
        <ul className='ul-ships'>
          {ships.map((ship, index) => (
            <li
              key={index}
              onClick={() => onShipSelect(ship)}
              className={selectedShip === ship ? 'selected' : ''}
            >
               {selectedShipQuantities[ship.name]}
              <ImageLoader imageUrl={ship.imageSrc} alt="Ship" className={ship.className || 'ship-icon'} />
            </li>
            
          ))}
        </ul>
        
      </div>
      </div>
    );
  }
  

export default ShipSelection;
