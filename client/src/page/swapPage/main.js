import SwapQVEtoarbQVE from "./swapQVEtoarbQVE";
import SwaparbQVEtoQVE from "./swaparbQVEtoQVE";
import { useState } from "react";
function Main() {
    const [icon, setIcon] = useState(0);

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      }
      
    return (
        <>
        {!!(icon === 0) ? 
        <SwaparbQVEtoQVE setIcon={setIcon}></SwaparbQVEtoQVE> 
        :
        <SwapQVEtoarbQVE setIcon={setIcon}></SwapQVEtoarbQVE>
        }
        </>
    );
}

export default Main;