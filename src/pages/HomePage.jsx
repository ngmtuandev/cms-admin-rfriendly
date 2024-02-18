import { Header } from '../components/index'
import React, { useState } from 'react'

const HomePage = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleSelectComponent = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div>
      <Header onSelectComponent={handleSelectComponent}></Header>
      {selectedComponent}
    </div>
  )
}

export default HomePage
