import { Outlet } from "react-router-dom";

function App() {

  return (
    <div className="bg-gradient-to-r from-slate-950 to-slate-900">
      <div className="container mx-auto px-4">
        <Outlet></Outlet>
      </div>
    </div>

  )
}

export default App
