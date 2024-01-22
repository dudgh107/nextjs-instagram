import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
    desk: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 567 },
      items: 6
    },
    mobile: {
      breakpoint: { max: 456764, min: 0 },
      items: 5
    }
  };
export default function ScrollableBar({children,}: {children: React.ReactNode}) {
    
    return (
        <Carousel responsive={responsive}
            className="w-full flex gap-2"
        >
            {children}
        </Carousel>
    );
}





