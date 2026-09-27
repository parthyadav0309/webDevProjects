import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  Banner,
  Deals,
  Brands,
  Brands1,
  TopPicks,
  categories,
  categories1,
  categories2,
  TopBrands,
  TopBrands1,
  TopBrands2,
  SlashedPrice,
  SlashedPrice1,
  BestBuys,
  BestBuys1,
  MyntraLuxe,
  MyntraLuxe1,
  GiftCards,
  FirstOnMyntra,
  FirstOnMyntra1,
  HottestFinds,
  TrendsForHer,
  TrendsForHim,
  Kidswear,
  NewBrands,
  SpringSeason,
  occasion,
  occasion1,
  Grooming,
  Grooming1,
  Unmissable,
  Colours,
  Colours1,
  Influencers,
  BudgetPicks,
  TrendingOutfits,
} from "../Data/Data";
import Donate from "./images/Donation.webp";
import Spotlight from "./images/spotlight.gif";

function Home() {
  window.scroll(0, 0);
  useEffect(()=>{
    document.getElementById("loginProfileIcon").style.display = "block";
    document.body.style.background = "none";
  },[])

 
    // return (
    //   <div>
    //     <img
    //       src="/images/DEAL_OF_THE_DAY/Amazing-Offers.webp"
    //       alt="Amazing Offers"
    //     />
    //   </div>
    // );
  

  return (
    <div>
      <div className="backdrop" id="backdrop">
        .
      </div>
      <div className="my-lg-5 mb-5 mt-3">
        <Carousel>
          {Banner.map((e) => (
            <Carousel.Item interval="3000" key={e.id}>
              <img src={e.image} className="img-fluid d-block w-100"></img>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="my-5">
        <img src={Donate} className="img-fluid w-100" alt="donation" />
      </div>

      <div className="">
        <h2 className="title pl-4 mb-5">DEAL OF THE DAY</h2>
        <div className="dealsRow">
          <div className="d-flex">
            {Deals.map((image, index) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    key={index}
                    src={image}
                    style={{ width: "25.4vh", height: "37vh" }}
                    alt={`Deal ${index}`}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <img src={Spotlight} className="img-fluid w-100" alt="spotlight" />
      </div>

      <div className="">
        <h2 className="title pl-4 my-5">BEST OF MYNTRA EXCLUSIVE BRANDS</h2>
        <div className="dealsRow">
          <div className="d-flex">
            {Brands.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
        <div className="dealsRow">
          <div className="d-flex">
            {Brands1.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="title pl-4 my-5">TOP PICKS</h2>
        <div className="dealsRow">
          <div className="d-flex">
            {TopPicks.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="title pl-4 my-5">CATEGORIES TO BAG</h2>
        <div className="dealsRow">
          <div className="d-flex">
            {categories.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
        <div className="dealsRow">
          <div className="d-flex">
            {categories1.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
        <div className="dealsRow">
          <div className="d-flex">
            {categories2.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="title pl-4 my-5">DEALS ON TOP BRANDS</h2>
        <div className="dealsRow">
          <div className="d-flex">
            {TopBrands.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
        <div className="dealsRow">
          <div className="d-flex">
            {TopBrands1.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
        <div className="dealsRow">
          <div className="d-flex">
            {TopBrands2.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="title pl-4 my-5">BRANDS AT SLASHED PRICES</h2>
        <div className="dealsRow">
          <div className="d-flex">
            {SlashedPrice.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
        <div className="dealsRow">
          <div className="d-flex">
            {SlashedPrice1.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="title pl-4 my-5">BEST BUYS</h2>
        <div className="dealsRow">
          <div className="d-flex">
            {BestBuys.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
        <div className="dealsRow">
          <div className="d-flex">
            {BestBuys1.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="title pl-4 my-5">MYNTRA LUXE</h2>
        <div className="dealsRow">
          <div className="d-flex">
            {MyntraLuxe.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
        <div className="dealsRow">
          <div className="d-flex">
            {MyntraLuxe1.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="title pl-4 my-5">GIFTING CARDS</h2>
        <div className="dealsRow">
          <div className="d-flex">
            {GiftCards.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "40.6vh", height: "33vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="title pl-4 my-5">SPRING SUMMER 2026- FIRST ON MYNTRA</h2>
        <div className="dealsRow">
          <div className="d-flex">
            {FirstOnMyntra.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
        <div className="dealsRow">
          <div className="d-flex">
            {FirstOnMyntra1.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="title pl-4 my-5">STYLECAST HOTTEST FINDS</h2>
        <div className="dealsRow">
          <div className="d-flex">
            {HottestFinds.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "29vh", height: "39vh" }}
                  />
                </NavLink>{" "}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="title pl-4 my-5">TRENDS FOR HER</h2>
        <div className="dealsRow">
          <div className="d-flex">
            {TrendsForHer.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="title pl-4 my-5">TRENDS FOR HIM</h2>
        <div className="dealsRow">
          <div className="d-flex">
            {TrendsForHim.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="title pl-4 my-5">BEST OF KIDSWEAR</h2>
        <div className="dealsRow">
          <div className="d-flex">
            {Kidswear.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="title pl-4 my-5">NEW IN TOP BRANDS</h2>
        <div className="dealsRow">
          <div className="d-flex">
            {NewBrands.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="title pl-4 my-5">SPRING SUMMER SEASON CHECKLIST</h2>
        <div className="dealsRow">
          <div className="d-flex">
            {SpringSeason.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="title pl-4 my-5">NEWNESS FOR EVERY OCCASION</h2>
        <div className="dealsRow">
          <div className="d-flex">
            {occasion.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "40.6vh", height: "33vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
        <div className="dealsRow">
          <div className="d-flex">
            {occasion1.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "40.6vh", height: "33vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="title pl-4 my-5">LATEST IN BEAUTY & GROOMING</h2>
        <div className="dealsRow">
          <div className="d-flex">
            {Grooming.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "40.6vh", height: "33vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
        <div className="dealsRow">
          <div className="d-flex">
            {Grooming1.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "40.6vh", height: "33vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="title pl-4 my-5">UNMISSABLE THIS SEASON</h2>
        <div className="dealsRow">
          <div className="d-flex">
            {Unmissable.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="title pl-4 my-5">COLOURS OF THE SEASON</h2>
        <div className="dealsRow">
          <div className="d-flex">
            {Colours.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "40.6vh", height: "33vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
        <div className="dealsRow">
          <div className="d-flex">
            {Colours1.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "40.6vh", height: "33vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="title pl-4 my-5">TOP INFLUENCERS EXCLUSIVE STYLES</h2>
        <div className="dealsRow">
          <div className="d-flex">
            {Influencers.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="title pl-4 my-5">BUDGET PICKS INFLUENCERS LOVE</h2>
        <div className="dealsRow">
          <div className="d-flex">
            {BudgetPicks.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="title pl-4 my-5">TRENDING OUTFITS BY INFLUENCERS</h2>
        <div className="dealsRow">
          <div className="d-flex">
            {TrendingOutfits.map((image) => (
              <div className="" style={{ padding: "0" }}>
                <NavLink to="/myntra">
                  <img
                    src={image}
                    alt="Deals of the day"
                    style={{ width: "25.4vh", height: "37vh" }}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;