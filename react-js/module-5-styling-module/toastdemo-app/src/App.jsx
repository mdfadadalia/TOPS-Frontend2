import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const notify = () => {
    toast("Data Saved Successfully!");
  }

  return (
    <div>
      <button onClick={notify}>Click General toast </button><br/>
      <button onClick={()=>toast.success("Data Save Sucessfully")}>Click Sucess toast</button><br/>
      <button onClick={()=>toast.error("Error in Save Data")}>Click Error toast</button><br/>
      <button onClick={()=>toast.info("Data Founded")}>Click Info toast</button><br/>
      <button onClick={()=>toast.warning("Want to Delete Data")}>Click Warning toast</button><br/>
      <button onClick={()=>toast.success("Thanks for appointment successfully booked !", {position: "bottom-right"})}>Click Warning toast bottom-right inline</button><br/>       

      {/* <ToastContainer /> */}
      <ToastContainer position="top-left" autoClose={2000} /> 
      {/* top-right
          top-left
          bottom-right
          bottom-left 
      */}
    </div>
  );
}

export default App;