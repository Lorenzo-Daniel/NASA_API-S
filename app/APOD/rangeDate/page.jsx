"use client";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { TiTick } from "react-icons/ti";
import { CircleLoader } from "react-spinners";
import { RiErrorWarningFill } from "react-icons/ri";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

function RangeDate() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [dateErrors, setDateErrors] = useState({
    start: { error: false, message: "" },
    end: { error: false, message: "" },
    range: { error: false, message: "" },
  });
  const [dateSuccess, setDateSuccess] = useState({
    start: { success: false },
    end: { success: false },
  });

  const minDate = new Date("1995-06-16").getTime();
  const maxDate = new Date().getTime();

  const validateDates = (start, end) => {
    let valid = true;

    if (
      start === "" ||
      new Date(start).getTime() < minDate ||
      new Date(start).getTime() > maxDate
    ) {
      setDateErrors((prevErrors) => ({
        ...prevErrors,
        start: {
          error: true,
          message: `Date must be between ${new Date(
            minDate
          ).toLocaleDateString()} and ${new Date(
            maxDate
          ).toLocaleDateString()}.`,
        },
      }));
      setDateSuccess((prevSuccess) => ({
        ...prevSuccess,
        start: { success: false },
      }));
      valid = false;
      return;
    } else {
      setDateErrors((prevErrors) => ({
        ...prevErrors,
        start: { error: false, message: "" },
      }));
      setDateSuccess((prevSuccess) => ({
        ...prevSuccess,
        start: { success: true },
      }));
    }

    if (
      end === "" ||
      new Date(end).getTime() < minDate ||
      new Date(end).getTime() > maxDate
    ) {
      setDateErrors((prevErrors) => ({
        ...prevErrors,
        end: {
          error: true,
          message: `End date must be between ${new Date(
            minDate
          ).toLocaleDateString()} and ${new Date(
            maxDate
          ).toLocaleDateString()}.`,
        },
      }));
      setDateSuccess((prevSuccess) => ({
        ...prevSuccess,
        end: { success: false },
      }));
      valid = false;
      return;
    } else {
      setDateErrors((prevErrors) => ({
        ...prevErrors,
        end: { error: false, message: "" },
      }));
      setDateSuccess((prevSuccess) => ({
        ...prevSuccess,
        end: { success: true },
      }));
    }

    if (start && end && new Date(start).getTime() > new Date(end).getTime()) {
      setDateErrors((prevErrors) => ({
        ...prevErrors,
        range: {
          error: true,
          message: "End date cannot be before than the start date.",
        },
      }));
      setDateSuccess((prevSuccess) => ({
        ...prevSuccess,
        range: { success: false },
      }));
      setDateSuccess((prevSuccess) => ({
        ...prevSuccess,
        end: { success: false },
      }));
      valid = false;
      return;
    } else {
      setDateErrors((prevErrors) => ({
        ...prevErrors,
        range: { error: false, message: "" },
      }));
    }

    return valid;
  };

  const searchData = (e) => {
    e.preventDefault();

    if (validateDates(startDate, endDate)) {
    
      
      getAPI(startDate, endDate);
    }
  };

  const getAPI = async (start, end) => {
    try {
      setSpinner(true);
      const request = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=teHf0lemJMiaPjInzdphYVK6bDuGLSaFt8jO8IIj&start_date=${start}&end_date=${end}`
      );
      const response = await request.json();
      setStartDate("");
      setEndDate("");
      setDateErrors({
        start: { error: false, message: "" },
        end: { error: false, message: "" },
        range: { error: false, message: "" },
      });
      setDateSuccess({
        start: { success: false },
        end: { success: false },
      });
      setSpinner(false);
      setData(response);
    } catch (error) {
      setSpinner(false);
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="relative">
      <h1 className="text-4xl md:text-5xl font-extralight text-center pt-10">
        Range Date
      </h1>
      <p className="text-gray-700 font-light text-md sm:text-xl p-10 pb-5 text-center ">
        Choose the range, this must be between 1995-06-16 and today. The maximum
        number of results is 100 pictures.
      </p>
      <form onSubmit={searchData}>
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center sm:gap-4">
          <div className="h-24 flex flex-col">
            <div className="flex justify-start items-center">
              <span className="text-md text-black-700 font-light ">
                Start Date
              </span>
            </div>
            <div className="flex-column  items-center">
              <div className="flex items-center ">
                <input
                  type="date"
                  className="w-64 h-10 border cursor-pointer focus:outline-none px-2 rounded text-gray-700 font-light hover:bg-gray-100"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
                {dateErrors.start.error && (
                  <RiErrorWarningFill className="text-red-300 text-2xl ml-1 font-light" />
                )}
                {dateSuccess.start.success && (
                  <TiTick className="text-green-700 text-2xl ml-1 font-light" />
                )}
              </div>
            </div>
            {dateErrors.start.error && (
              <div className="text-red-500 text-center text-xs mt-1">
                {dateErrors.start.message}
              </div>
            )}
          </div>

          <div className="h-24 flex flex-col">
            <div className="flex justify-start items-center">
              <span className="text-md text-black-700 font-light ">
                End Date
              </span>
            </div>
            <div className="flex-column  items-center ">
              <div className="flex items-center  ">
                <input
                  type="date"
                  className="w-64  h-10 border cursor-pointer focus:outline-none px-2 rounded text-gray-700 font-light hover:bg-gray-100"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
                {dateErrors.end.error ||
                  (dateErrors.range.error && (
                    <RiErrorWarningFill className="text-red-300 text-2xl ml-1 font-light" />
                  ))}
                {dateSuccess.end.success && (
                  <TiTick className="text-green-700 text-2xl ml-1 font-light" />
                )}
              </div>
            </div>
            {dateErrors.end.error && (
              <div className="text-red-500 text-center text-xs mt-1">
                {dateErrors.end.message}
              </div>
            )}
            {dateErrors.range.error && (
              <div className="text-red-500 text-center text-xs mt-1">
                {dateErrors.range.message}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center ">
          <div className="   ">
            {!spinner ? (
              <button
                type="submit"
                className=" h-14 w-24 px-3 py-2 bg-gray-100 border rounded text-gray-500 hover:opacity-200  hover:text-black hover:bg-gray-200 "
              >
                Search
              </button>
            ) : (
              <div className="flex justify-center">
                <CircleLoader color={"#d4d6da"} size={50} />
              </div>
            )}
          </div>
        </div>
      </form>
      <div className="container p-5 m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {data?.map((img, index) => {
          return (
            <div key={index} > 
              <div className="h-60 sm:h-40 lg:h-50 xl:h-52  overflow-hidden flex-fill " >

                {img?.media_type === "video" ? (
                  <ReactPlayer url={img.url} controls={true} width="100%" height="100%" />
                ) : (
                  <img src={img.url} alt={index} className="" />
                )}
              </div>
              <div className="flex justify-between">
                <span> {img.date}</span>
                <span className="">{img.media_type}</span>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default RangeDate;


const images = [
  {
    copyright: "\nN. D. Liao\n",
    date: "2024-03-04",
    explanation:
      "What's happening across that field?  Pictured here are not auroras but nearby light pillars, a phenomenon typically much closer.   In most places on Earth, a lucky viewer can see a Sun pillar, a column of light appearing to extend up from the Sun caused by flat fluttering ice-crystals reflecting sunlight from the upper atmosphere.  Usually, these ice crystals evaporate before reaching the ground.  During freezing temperatures, however, flat fluttering ice crystals may form near the ground in a form of light snow  sometimes known as a crystal fog.  These ice crystals may then reflect ground lights in columns not unlike a Sun pillar.  The featured image was taken last month across the Wulan Butong Grasslands in Inner Mongolia, China.",
    hdurl:
      "https://apod.nasa.gov/apod/image/2403/PillarsMongolia_Liao_6240.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Light Pillars Over Inner Mongolia",
    url: "https://apod.nasa.gov/apod/image/2403/PillarsMongolia_Liao_960.jpg",
  },
  {
    copyright: "\nDavid Moulton\n",
    date: "2024-03-05",
    explanation:
      "Is this a painting or a photograph? In this celestial abstract art composed with a cosmic brush, dusty nebula NGC 2170, also known as the Angel Nebula, shines just above the image center. Reflecting the light of nearby hot stars, NGC 2170 is joined by other bluish reflection nebulae, a red emission region, many dark absorption nebulae, and a backdrop of colorful stars. Like the common household items that abstract painters often choose for their subjects, the clouds of gas, dust, and hot stars featured here are also commonly found in a setting like this one --  a massive, star-forming molecular cloud in the constellation of the Unicorn (Monoceros). The giant molecular cloud, Mon R2, is impressively close, estimated to be only 2,400 light-years or so away. At that distance, this canvas would be over 60 light-years across.",
    hdurl: "https://apod.nasa.gov/apod/image/2403/AngelNebula_Moulton_2516.jpg",
    media_type: "image",
    service_version: "v1",
    title: "NGC 2170: Angel Nebula Abstract Art",
    url: "https://apod.nasa.gov/apod/image/2403/AngelNebula_Moulton_960.jpg",
  },
  {
    date: "2024-03-06",
    explanation:
      "What kind of celestial object is this? A relatively normal galaxy -- but seen from its edge.  Many disk galaxies are actually just as thin as NGC 5866, the Spindle galaxy, pictured here, but are not seen edge-on from our vantage point.  A perhaps more familiar galaxy seen edge-on is our own Milky Way galaxy.  Also cataloged as M102, the Spindle galaxy has numerous and complex dust lanes appearing dark and red, while many of the bright stars in the disk give it a more blue underlying hue.  The blue disk of young stars can be seen in this Hubble image extending past the dust in the extremely thin galactic plane. There is evidence that the Spindle galaxy has cannibalized smaller galaxies over the past billion years or so, including multiple streams of faint stars, dark dust that extends away from the main galactic plane, and a surrounding group of galaxies (not shown).  In general, many disk galaxies become thin because the gas that forms them collides with itself as it rotates about the gravitational center. The Spindle galaxy lies about 50 million light years distant toward the constellation of the Dragon (Draco).",
    hdurl:
      "https://apod.nasa.gov/apod/image/2403/M102_HubbleEbrahimian_3615.jpg",
    media_type: "image",
    service_version: "v1",
    title: "M102: Edge-on Disk Galaxy",
    url: "https://apod.nasa.gov/apod/image/2403/M102_HubbleEbrahimian_960.jpg",
  },
  {
    copyright: "Michael Seeley",
    date: "2024-03-07",
    explanation:
      "Not the James Webb Space Telescope's latest view of a distant galactic nebula, this cloud of gas and dust dazzled spacecoast skygazers on March 3. The telephoto snapshot was taken minutes after the launch of a Falcon 9 rocket on the SpaceX Crew-8 mission to the International Space Station. It captures plumes and exhaust from the separated first and second stages, a drifting Rorschach pattern in dark evening skies.  The bright spot near bottom center within the stunning terrestrial nebulosity is the second stage engine firing to carry 4 humans to space in the Crew Dragon spacecraft Endeavour. In sharp silhouette just above it is the Falcon 9 first stage booster orienting itself for return to a landing zone at Cape Canaveral, planet Earth. This reuseable first stage booster was making its first flight. But the Crew Dragon Endeavour capsule has flown humans to low Earth orbit and back again 4 times before. Endeavour, as a name for a spacecraft, has also seen reuse, christening retired Space Shuttle Endeavour and the Apollo 15 command module.",
    hdurl: "https://apod.nasa.gov/apod/image/2403/Crew-8image0.jpeg",
    media_type: "image",
    service_version: "v1",
    title: "The Crew-8 Nebula",
    url: "https://apod.nasa.gov/apod/image/2403/Crew-8image0_1024.jpeg",
  },
  {
    copyright: "Robert Gendler",
    date: "2024-03-08",
    explanation:
      "The Tarantula Nebula, also known as 30 Doradus, is more than a thousand light-years in diameter, a giant star forming region within nearby satellite galaxy the Large Magellanic Cloud. About 180 thousand light-years away, it's the largest, most violent star forming region known in the whole Local Group of galaxies. The cosmic arachnid sprawls across this magnificent view, an assembly of image data from large space- and ground-based telescopes. Within the Tarantula (NGC 2070), intense radiation, stellar winds, and supernova shocks from the central young cluster of massive stars cataloged as R136 energize the nebular glow and shape the spidery filaments. Around the Tarantula are other star forming regions with young star clusters, filaments, and blown-out bubble-shaped clouds. In fact, the frame includes the site of the closest supernova in modern times, SN 1987A, at lower right. The rich field of view spans about 2 degrees or 4 full moons in the southern constellation Dorado. But were the Tarantula Nebula closer, say 1,500 light-years distant like the Milky Way's own star forming Orion Nebula, it would take up half the sky.",
    hdurl:
      "https://apod.nasa.gov/apod/image/2403/Tarantula-HST-ESO-Webb-LL.jpg",
    media_type: "image",
    service_version: "v1",
    title: "The Tarantula Zone",
    url: "https://apod.nasa.gov/apod/image/2403/Tarantula-HST-ESO-Webb-SS1024.jpg",
  },
  {
    copyright: "Petr Horálek",
    date: "2024-03-09",
    explanation:
      "As spring approaches for northern skygazers, Comet 12P/Pons-Brooks is growing brighter. Currently visible with small telescopes and binoculars, the Halley-type comet could reach naked eye visibility in the coming weeks. Seen despite a foggy atmosphere, the comet's green coma and long tail hover near the horizon in this well-composed deep night skyscape from Revuca, Slovakia recorded on March 5. M31, also known as the Andromeda galaxy, and bright yellowish star Mirach, beta star of the constellation Andromeda, hang in the sky above the comet. The Andromeda galaxy is some 2.5 million light-years beyond the Milky Way. Comet Pons-Brooks is a periodic visitor to the inner Solar System and less than 14 light-minutes away. Reaching its perihelion on April 21, this comet should be visible in the sky during the April 8 total solar eclipse.",
    hdurl:
      "https://apod.nasa.gov/apod/image/2403/2024_03_05_Pons-Brooks_Revuca_1500px.png",
    media_type: "image",
    service_version: "v1",
    title: "Comet Pons-Brooks in Northern Spring",
    url: "https://apod.nasa.gov/apod/image/2403/2024_03_05_Pons-Brooks_Revuca_1200px.png",
  },
  {
    copyright: "\nFred Bruenjes\n(moonglow.net)\n",
    date: "2024-03-10",
    explanation:
      "Would you go to the end of the world to see a total eclipse of the Sun? If you did, would you be surprised to find someone else there already? In 2003, the Sun, the Moon, Antarctica, and two photographers all lined up in Antarctica during an unusual total solar eclipse.  Even given the extreme location, a group of enthusiastic eclipse chasers ventured near the bottom of the world to experience the surreal momentary disappearance of the Sun behind the Moon.  One of the treasures collected was the featured picture -- a composite of four separate images digitally combined to realistically simulate how the adaptive human eye saw the eclipse.  As the image was taken, both the Moon and the Sun peeked together over an Antarctic ridge.  In the sudden darkness, the magnificent corona of the Sun became visible around the Moon.  Quite by accident, another photographer was caught in one of the images checking his video camera.   Visible to his left are an equipment bag and a collapsible chair.  A more easily visible solar eclipse will occur in just under four weeks and be visible from a long, thin swath of North America.",
    hdurl:
      "https://apod.nasa.gov/apod/image/2403/AntarcticEclipse_bruenjes_960.jpg",
    media_type: "image",
    service_version: "v1",
    title: "A Total Eclipse at the End of the World",
    url: "https://apod.nasa.gov/apod/image/2403/AntarcticEclipse_bruenjes_960.jpg",
  },
  {
    copyright: "\nPetr Horálek /\nInstitute of Physics in Opava\n",
    date: "2024-03-11",
    explanation:
      "What glows in the night? This night featured a combination of usual and unusual glows. Perhaps the most usual glow was from the Moon, a potentially familiar object. The full Moon's nearly vertical descent results from the observer being near Earth's equator. As the Moon sets, air and aerosols in Earth's atmosphere preferentially scatter out blue light, making the Sun-reflecting satellite appear reddish when near the horizon.                                                                        Perhaps the most unusual glow was from the bioluminescent plankton, likely less familiar objects. These microscopic creatures glow blue, it is thought, primarily to surprise and deter predators. In this case, the glow was caused primarily by plankton-containing waves crashing onto the beach. The image was taken on Soneva Fushi Island, Maldives just over one year ago.   Your Sky Surprise: What picture did APOD feature on your birthday? (post 1995)",
    hdurl:
      "https://apod.nasa.gov/apod/image/2403/FullPlantonMoon_Horalek_1022.jpg",
    media_type: "image",
    service_version: "v1",
    title: "A Full Plankton Moon",
    url: "https://apod.nasa.gov/apod/image/2403/FullPlantonMoon_Horalek_1022.jpg",
  },
  {
    copyright: "\nSeung Hye Yang\n",
    date: "2024-03-12",
    explanation:
      "What's that over the horizon? What may look like a strangely nearby galaxy is actually a normal rocket's exhaust plume -- but unusually backlit.  Although the SpaceX Falcon 9 rocket was launched from Vandenberg Space Force Base in California, USA, its burned propellant was visible over a much wider area, with the featured photograph being taken from Akureyri, Iceland. The huge spaceship was lifted off a week ago, and the resulting spectacle was captured soon afterward with a single 10-second smartphone exposure, before it quickly dissipated. Like noctilucent clouds, the plume's brightness is caused by the Twilight Effect, where an object is high enough to be illuminated by the twilight Sun, even when the observer on the ground experiences the darkness of night. The spiral shape is caused by the Falcon  rocket reorienting to release satellites in different directions. Stars and faint green and red aurora appear in the background of this extraordinary image.",
    hdurl: "https://apod.nasa.gov/apod/image/2403/RocketSpiral_Yang_3024.jpg",
    media_type: "image",
    service_version: "v1",
    title: "A Galaxy-Shaped Rocket Exhaust Spiral",
    url: "https://apod.nasa.gov/apod/image/2403/RocketSpiral_Yang_960.jpg",
  },
  {
    copyright: "\nGianni Lacroce\n",
    date: "2024-03-13",
    explanation:
      "A broad expanse of glowing gas and dust presents a bird-like visage to astronomers from planet Earth, suggesting its popular moniker: the Seagull Nebula. This portrait of the cosmic bird covers a 2.5-degree wide swath across the plane of the Milky Way, near the direction of Sirius, alpha star of the constellation of the Big Dog (Canis Major). Of course, the region includes objects with other catalog designations: notably NGC 2327, a compact, dusty emission and reflection nebula with an embedded massive star that forms the bird's head. Likely part of a larger shell structure swept up by successive supernova explosions, the broad Seagull Nebula is cataloged as Sh2-296 and IC 2177. The prominent bluish arc below and right of center is a bow shock from runaway star FN Canis Majoris. Dominated by the reddish glow of atomic hydrogen, this complex of gas and dust clouds with other stars of the Canis Majoris OB1 association spans over 200 light-years at the Seagull Nebula's estimated 3,800 light-year distance.   Almost Hyperspace: Random APOD Generator",
    hdurl: "https://apod.nasa.gov/apod/image/2403/Seagull_Lacroce_2048.jpg",
    media_type: "image",
    service_version: "v1",
    title: "The Seagull Nebula",
    url: "https://apod.nasa.gov/apod/image/2403/Seagull_Lacroce_1080.jpg",
  },
  {
    copyright: "El Cielo de Canarias",
    date: "2024-03-14",
    explanation:
      "What phase of the Moon is 3.14 radians from the Sun? The Full Moon, of course. Even though the Moon might look full for several days, the Moon is truly at its full phase when it is Pi radians (aka 180 degrees) from the Sun in ecliptic longitude. That's opposite the Sun in planet Earth's sky. Rising as the Sun set on March 9, 2020, only an hour or so after the moment of its full phase, this orange tinted and slightly flattened Moon still looked full. It was photographed opposite the setting Sun from Teide National Park on the Canary Island of Tenerife. Also opposite the setting Sun, seen from near the Teide volcano peak about 3,500 meters above sea level, is the mountain's rising triangular shadow extending into Earth's dense atmosphere. Below the distant ridge line on the left are the white telescope domes of Teide Observatory. Again Pi radians from the Sun, on March 25 the Full Moon will dim slightly as it glides through Earth's outer shadow in a penumbral lunar eclipse.",
    hdurl: "https://apod.nasa.gov/apod/image/2403/MoonriseShadowDLopez_1.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Moon Pi and Mountain Shadow",
    url: "https://apod.nasa.gov/apod/image/2403/MoonriseShadowDLopez_1024.jpg",
  },
  {
    copyright: "Dave Doctor",
    date: "2024-03-15",
    explanation:
      "Big, beautiful spiral galaxy NGC 1055 is a dominant member of a small galaxy group a mere 60 million light-years away toward the aquatically intimidating constellation Cetus. Seen edge-on, the island universe spans over 100,000 light-years, a little larger than our own Milky Way galaxy. The colorful, spiky stars decorating this cosmic portrait of NGC 1055 are in the foreground, well within the Milky Way. But the telltale pinkish star forming regions are scattered through winding dust lanes along the distant galaxy's thin disk. With a smattering of even more distant background galaxies, the deep image also reveals a boxy halo that extends far above and below the central bulge and disk of NGC 1055. The halo itself is laced with faint, narrow structures, and could represent the mixed and spread out debris from a satellite galaxy disrupted by the larger spiral some 10 billion years ago.",
    hdurl: "https://apod.nasa.gov/apod/image/2403/Image133k_n1055.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Portrait of NGC 1055",
    url: "https://apod.nasa.gov/apod/image/2403/Image133k_n1055_1024.jpg",
  },
  {
    date: "2024-03-16",
    explanation:
      "The southern winter Milky Way sprawls across this night skyscape. Looking due south, the webcam view was recorded near local midnight on March 11 in dry, dark skies over the central Chilean Atacama desert. Seen below the graceful arc of diffuse starlight are satellite galaxies of the mighty Milky Way, also known as the Large and Small Magellanic clouds. In the foreground is the site of the European Southern Observatory's 40-metre-class Extremely Large Telescope (ELT). Under construction at the 3000 metre summit of Cerro Armazones, the ELT is on track to become planet Earth's biggest Eye on the Sky.",
    hdurl: "https://apod.nasa.gov/apod/image/2403/ELT_2024-03-13_2048.jpg",
    media_type: "image",
    service_version: "v1",
    title: "ELT and the Milky Way",
    url: "https://apod.nasa.gov/apod/image/2403/ELT_2024-03-13_1024.jpg",
  },
  {
    date: "2024-03-17",
    explanation:
      "Is this galaxy jumping through a giant ring of stars?  Probably not.  Although the precise dynamics behind the featured image is yet unclear, what is clear is that the pictured galaxy, NGC 7714, has been stretched and distorted by a recent collision with a neighboring galaxy. This smaller neighbor, NGC 7715, situated off to the left of the frame, is thought to have charged right through NGC 7714. Observations indicate that the golden ring pictured is composed of millions of older Sun-like stars that are likely co-moving with the interior bluer stars. In contrast, the bright center of NGC 7714 appears to be undergoing a burst of new star formation.  The featured image was captured by the Hubble Space Telescope.  NGC 7714 is located about 130 million light years away toward the constellation of the Two Fish (Pisces).  The interactions between these galaxies likely started about 150 million years ago and should continue for several hundred million years more, after which a single central galaxy may result.",
    hdurl: "https://apod.nasa.gov/apod/image/2403/Ngc7714_HubblePohl_2048.jpg",
    media_type: "image",
    service_version: "v1",
    title: "NGC 7714: Starburst after Galaxy Collision",
    url: "https://apod.nasa.gov/apod/image/2403/Ngc7714_HubblePohl_1080.jpg",
  },
  {
    copyright: "\nJan Erik Vallestad\n",
    date: "2024-03-18",
    explanation:
      "A bright comet will be visible during next month's total solar eclipse.  This very unusual coincidence occurs because Comet 12P/Pons-Brooks's return to the inner Solar System places it by chance only 25 degrees away from the Sun during Earth's April 8 total solar eclipse.  Currently the comet is just on the edge of visibility to the unaided eye, best visible with binoculars in the early evening sky toward the constellation of the Fish (Pisces). Comet Pons-Brooks, though, is putting on quite a show for deep camera images even now.  The featured image is a composite of three very specific colors, showing the comet's ever-changing ion tail in light blue, its outer coma in green, and highlights some red-glowing gas around the coma in a spiral. The spiral is thought to be caused by gas being expelled by the slowly rotating nucleus of the giant iceberg comet. Although it is always difficult to predict the future brightness of comets, Comet Pons-Brook has been particularly prone to outbursts, making it even more difficult to predict how bright it will actually be as the Moon moves in front of the Sun on April 8.   Total Eclipse Info: 2024 Total Solar Eclipse from NASA",
    hdurl:
      "https://apod.nasa.gov/apod/image/2403/CometPonsBrook_Vallestad_2564.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Comet Pons-Brooks' Swirling Coma",
    url: "https://apod.nasa.gov/apod/image/2403/CometPonsBrook_Vallestad_960.jpg",
  },
  {
    copyright: "\nAlan Dyer, Amazingsky.com,\nTWAN\n",
    date: "2024-03-19",
    explanation:
      'What\'s that at the end of the road? The Sun. Many towns have roads that run east-west, and on two days each year, the Sun rises and sets right down the middle. Today, in some parts of the world (tomorrow in others), is one of those days: an equinox.  Not only is this a day of equal night ("aequus"-"nox") and day time, but also a day when the sun rises precisely to the east and sets due west. Displayed here is a picturesque rural road in Alberta, Canada that runs approximately east-west. The featured image was taken during the September Equinox of 2021, but the geometry remains the same every year.  In many cultures, this March equinox is taken to be the first day of a season, typically spring in Earth\'s northern hemisphere, and autumn in the south. Does your favorite street run east-west? Tonight, at sunset, you can find out with a quick glance.',
    hdurl: "https://apod.nasa.gov/apod/image/2403/EquinoxSunset_Dyer_1701.jpg",
    media_type: "image",
    service_version: "v1",
    title: "A Picturesque Equinox Sunset",
    url: "https://apod.nasa.gov/apod/image/2403/EquinoxSunset_Dyer_960.jpg",
  },
  {
    copyright: "\nMike Selby\n",
    date: "2024-03-20",
    explanation:
      "Across the heart of the Virgo Galaxy Cluster lies a string of galaxies known as Markarian's Chain. Prominent in Markarian's Chain are these two interacting galaxies, NGC 4438 (left) and NGC 4435 - also known as The Eyes. About 50 million light-years away, the two galaxies appear to be about 100,000 light-years apart in this sharp close-up, but have likely approached to within an estimated 16,000 light-years of each other in their cosmic past. Gravitational tides from the close encounter have ripped away at their stars, gas, and dust. The more massive NGC 4438 managed to hold on to much of the material torn out in the collision, while material from the smaller NGC 4435 was more easily lost. The remarkably deep image of this crowded region of the universe also includes many more distant background galaxies.",
    hdurl: "https://apod.nasa.gov/apod/image/2403/Ngc4438_Selby_2068.jpg",
    media_type: "image",
    service_version: "v1",
    title: "The Eyes in Markarian's Galaxy Chain",
    url: "https://apod.nasa.gov/apod/image/2403/Ngc4438_Selby_960.jpg",
  },
  {
    copyright: "Steve Cannistra",
    date: "2024-03-21",
    explanation:
      "This popular group leaps into the early evening sky around the March equinox and the northern hemisphere spring.  Famous as the Leo Triplet, the three magnificent galaxies found in the prominent constellation Leo gather here in one astronomical field of view. Crowd pleasers when imaged with even modest telescopes, they can be introduced individually as NGC 3628 (left), M66 (bottom right), and M65 (top). All three are large spiral galaxies but tend to look dissimilar, because their galactic disks are tilted at different angles to our line of sight. NGC 3628, also known as the Hamburger Galaxy, is temptingly seen edge-on, with obscuring dust lanes cutting across its puffy galactic plane. The disks of M66 and M65 are both inclined enough to show off their spiral structure.  Gravitational interactions between galaxies in the group have left telltale signs, including the tidal tails and warped, inflated disk of NGC 3628 and the drawn out spiral arms of M66. This gorgeous view of the region spans over 1 degree (two full moons) on the sky in a frame that covers over half a million light-years at the trio's estimated distance of 30 million light-years.",
    hdurl: "https://apod.nasa.gov/apod/image/2403/leotripletasi294large.jpg",
    media_type: "image",
    service_version: "v1",
    title: "The Leo Trio",
    url: "https://apod.nasa.gov/apod/image/2403/leotripletasi294large1024.jpg",
  },
  {
    date: "2024-03-22",
    explanation:
      "A tiny moon with a scary name, Phobos emerges from behind the Red Planet in this timelapse sequence from the Earth-orbiting Hubble Space Telescope. Over 22 minutes the 13 separate exposures were captured near the 2016 closest approach of Mars to planet Earth. Martians have to look to the west to watch Phobos rise, though. The small moon is closer to its parent planet than any other moon in the Solar System, about 3,700 miles (6,000 kilometers) above the Martian surface. It completes one orbit in just 7 hours and 39 minutes. That's faster than a Mars rotation, which corresponds to about 24 hours and 40 minutes. As a result, seen from the surface of Mars speeding Phobos rises above the western horizon 2 times in a Martian day. Still, Phobos is doomed.",
    hdurl: "https://apod.nasa.gov/apod/image/2403/STSCI-MarsPhobosComp3000.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Phobos: Moon over Mars",
    url: "https://apod.nasa.gov/apod/image/2403/STSCI-MarsPhobosComp1024.jpg",
  },
  {
    date: "2024-03-23",
    explanation:
      "This close-up from the Mars Reconnaissance Orbiter's HiRISE camera shows weathered craters and windblown deposits in southern Acidalia Planitia. A striking shade of blue in standard HiRISE image colors, to the human eye the area would probably look grey or a little reddish. But human eyes have not gazed across this terrain, unless you count the eyes of NASA astronauts in the sci-fi novel, \"The Martian\", by Andy Weir. The novel chronicles the adventures of Mark Watney, an astronaut stranded at the fictional Mars mission Ares 3 landing site, corresponding to the coordinates of this cropped HiRISE frame. For scale, Watney's 6-meter-diameter habitat at the site would be about 1/10th the diameter of the large crater. Of course, the Ares 3 landing coordinates are only about 800 kilometers north of the (real life) Carl Sagan Memorial Station, the 1997 Pathfinder landing site.",
    hdurl: "https://apod.nasa.gov/apod/image/2403/PIA19363.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Ares 3 Landing Site: The Martian Revisited",
    url: "https://apod.nasa.gov/apod/image/2403/PIA19363_1024.jpg",
  },
  {
    copyright: "CNES\n",
    date: "2024-03-24",
    explanation:
      "Here is what the Earth looks like during a solar eclipse. The shadow of the Moon can be seen darkening part of Earth. This shadow moved across the Earth at nearly 2000 kilometers per hour. Only observers near the center of the dark circle see a total solar eclipse - others see a partial eclipse where only part of the Sun appears blocked by the Moon. This spectacular picture of the 1999 August 11 solar eclipse was one of the last ever taken from the Mir space station. The two bright spots that appear on the upper left are thought to be Jupiter and Saturn. Mir was deorbited in a controlled re-entry in 2001. A new solar eclipse will occur over North America in about two weeks.",
    hdurl: "https://apod.nasa.gov/apod/image/2403/eclipse99_mir_960.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Looking Back at an Eclipsed Earth",
    url: "https://apod.nasa.gov/apod/image/2403/eclipse99_mir_960.jpg",
  },
  {
    date: "2024-03-25",
    explanation:
      "What does a supernova remnant sound like? Although sound is a compression wave in matter and does not carry into empty space, interpretive sound can help listeners appreciate and understand a visual image of a supernova remnant in a new way. Recently, the Jellyfish Nebula (IC 443) has been sonified quite creatively.  In the featured sound-enhanced video, when an imaginary line passes over a star, the sound of a drop falling into water is played, a sound particularly relevant to the nebula's aquatic namesake.  Additionally, when the descending line crosses gas that glows red, a low tone is played, while green sounds a middle tone, and blue produces a tone with a relatively high pitch. Light from the supernova that created the Jellyfish Nebula left approximately 35,000 years ago, when humanity was in the stone age.  The nebula will slowly disperse over the next million years, although the explosion also created a dense neutron star which will remain indefinitely.",
    media_type: "video",
    service_version: "v1",
    title: "Sonified: The Jellyfish Nebula Supernova Remnant",
    url: "https://youtube.com/embed/NqBfQeJqkfU?rel=0",
  },
  {
    date: "2024-03-26",
    explanation:
      "Comet Pons-Brooks has quite a tail to tell.  First discovered in 1385, this erupting dirty snowball loops back into our inner Solar System every 71 years and, this time, is starting to put on a show for deep camera exposures.  In the featured picture, the light blue stream is the ion tail which consists of charged molecules pushed away from the comet's nucleus by the solar wind.  The ion tail, shaped by the Sun's wind and the comet's core's rotation, always points away from the Sun.  Comet 12P/Pons–Brooks is now visible with binoculars in the early evening sky toward the northwest, moving perceptibly from night to night.  The frequently flaring comet is expected to continue to brighten, on the average, and may even become visible with the unaided eye --  during the day -- to those in the path of totality of the coming solar eclipse on April 8.",
    hdurl: "https://apod.nasa.gov/apod/image/2403/CometPons_Peirce_5119.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Comet Pons-Brooks' Ion Tail",
    url: "https://apod.nasa.gov/apod/image/2403/CometPons_Peirce_1080.jpg",
  },
  {
    copyright: "\nJoe Hua\n",
    date: "2024-03-27",
    explanation:
      "Almost every object in the featured photograph is a galaxy.  The Coma Cluster of Galaxies pictured here is one of the densest clusters known - it contains thousands of galaxies.  Each of these galaxies houses billions of stars - just as our own Milky Way Galaxy does.  Although nearby when compared to most other clusters, light from the Coma Cluster still takes hundreds of millions of years to reach us.  In fact, the Coma Cluster is so big it takes light millions of years just to go from one side to the other.  Most galaxies in Coma and other clusters are ellipticals, while most galaxies outside of clusters are spirals.  The nature of Coma's X-ray emission is still being investigated.",
    hdurl: "https://apod.nasa.gov/apod/image/2403/ComaCluster_Hua_960.jpg",
    media_type: "image",
    service_version: "v1",
    title: "The Coma Cluster of Galaxies",
    url: "https://apod.nasa.gov/apod/image/2403/ComaCluster_Hua_960.jpg",
  },
  {
    copyright: "\nMassimo Di Fusco",
    date: "2024-03-28",
    explanation:
      "Globular star cluster Omega Centauri, also known as NGC 5139, is 15,000 light-years away. The cluster is packed with about 10 million stars much older than the Sun within a volume about 150 light-years in diameter. It's the largest and brightest of 200 or so known globular clusters that roam the halo of our Milky Way galaxy. Though most star clusters consist of stars with the same age and composition, the enigmatic Omega Cen exhibits the presence of different stellar populations with a spread of ages and chemical abundances. In fact, Omega Cen may be the remnant core of a small galaxy merging with the Milky Way. With a yellowish hue, Omega Centauri's red giant stars are easy to pick out in this sharp, color telescopic view.",
    hdurl: "https://apod.nasa.gov/apod/image/2403/NGC5139_mdf.png",
    media_type: "image",
    service_version: "v1",
    title: "Millions of Stars in Omega Centauri",
    url: "https://apod.nasa.gov/apod/image/2403/NGC5139_mdf1024.png",
  },
  {
    date: "2024-03-29",
    explanation:
      "Looping through the Jovian system in the late 1990s, the Galileo spacecraft recorded stunning views of Europa and uncovered evidence that the moon's icy surface likely hides a deep, global ocean. Galileo's Europa image data has been remastered here, with improved calibrations to produce a color image approximating what the human eye might see. Europa's long curving fractures hint at the subsurface liquid water.  The tidal flexing the large moon experiences in its elliptical orbit around Jupiter supplies the energy to keep the ocean liquid. But more tantalizing is the possibility that even in the absence of sunlight that process could also supply the energy to support life, making Europa one of the best places to look for life beyond Earth. The Juno spacecraft currently in Jovian orbit has also made repeated flybys of the water world, returning images along with data exploring Europa's habitability. This October will see the launch of the NASA's Europa Clipper on a voyage of exploration. The spacecraft will make nearly 50 flybys, approaching to within 25 kilometers of Europa's icy surface.",
    hdurl: "https://apod.nasa.gov/apod/image/2403/PIA19048europa.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Galileo's Europa",
    url: "https://apod.nasa.gov/apod/image/2403/PIA19048europa1024.jpg",
  },
  {
    copyright: "Library of Melk Abbey, Frag. 229\n\n",
    date: "2024-03-30",
    explanation:
      "Discovered by accident, this manuscript page provides graphical insight to astronomy in medieval times, before the Renaissance and the influence of Nicolaus Copernicus, Tycho Brahe, Johannes Kepler, and Galileo. The intriguing page is from lecture notes on astronomy compiled by the monk Magister Wolfgang de Styria before the year 1490. The top panels clearly illustrate the necessary geometry for a lunar (left) and solar eclipse in the Earth-centered Ptolemaic system. At lower left is a diagram of the Ptolemaic view of the Solar System with text at the upper right to explain the movement of the planets according to Ptolemy's geocentric model. At the lower right is a chart to calculate the date of Easter Sunday in the Julian calendar. The illustrated manuscript page was found at historic Melk Abbey in Austria.",
    hdurl: "https://apod.nasa.gov/apod/image/2403/medieval_fragment50p.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Medieval Astronomy from Melk Abbey",
    url: "https://apod.nasa.gov/apod/image/2403/medieval_fragmentW600.jpg",
  },
  {
    copyright:
      "\nPetr Horálek\n(ESO\nPhoto Ambassador,\nInst. of Physics in Opava) ;\n Acknowledgement: \nXavier Jubier\n",
    date: "2024-03-31",
    explanation:
      "In late 2021 there was a total solar eclipse visible only at the end of the Earth.  To capture the unusual phenomenon, airplanes took flight below the clouded seascape of Southern Ocean. The featured image shows one relatively spectacular capture where the bright spot is the outer corona of the Sun and the eclipsing Moon is seen as the dark spot in the center.  A wing and engine of the airplane are visible across the left and bottom of the image, while another airplane observing the eclipse is visible on the far left. The dark area of the sky surrounding the eclipsed Sun is called a shadow cone. It is dark because you are looking down a long corridor of air shadowed by the Moon. A careful inspection of the eclipsed Sun will reveal the planet Mercury just to the right. You won't have to travel to the end of the Earth to see the next total solar eclipse. The total eclipse path will cross North America on 2024 April 8, just over one week from today.   NASA Coverage: Total Solar Eclipse of 2024 April 8",
    hdurl:
      "https://apod.nasa.gov/apod/image/2403/EclipseAntarctica_Horalek_1500.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Total Solar Eclipse Below the Bottom of the World",
    url: "https://apod.nasa.gov/apod/image/2403/EclipseAntarctica_Horalek_1080.jpg",
  },
  {
    date: "2024-04-01",
    explanation:
      "What's happening to the big black hole in the center of our galaxy?  It is sucking in matter from a swirling disk -- a disk that is magnetized, it has now been confirmed. Specifically, the black hole's accretion disk has recently been seen to emit polarized light, radiation frequently associated with a magnetized source. Pictured here is a close-up of Sgr A*, our Galaxy's central black hole, taken by radio telescopes around the world participating in the Event Horizon Telescope (EHT) Collaboration.  Superposed are illustrative curved lines indicating polarized light likely emitted from swirling magnetized gas that will soon fall into the 4+ million solar mass central black hole.  The central part of this image is likely dark because little light-emitting gas is visible between us and the dark event horizon of the black hole.  Continued EHT monitoring of this and M87's central black hole may yield new clues about the gravity of black holes and how infalling matter creates disks and jets.    NASA Predicts:  Moon to Get in Way of Sun",
    hdurl: "https://apod.nasa.gov/apod/image/2404/SagAstarB_EHT_2000.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Swirling Magnetic Field around Our Galaxy's Central Black Hole",
    url: "https://apod.nasa.gov/apod/image/2404/SagAstarB_EHT_960.jpg",
  },
  {
    copyright: "\nPhil Hart\n",
    date: "2024-04-02",
    explanation:
      "Only in the fleeting darkness of a total solar eclipse is the light of the solar corona easily visible. Normally overwhelmed by the bright solar disk, the expansive corona, the sun's outer atmosphere, is an alluring sight. But the subtle details and extreme ranges in the corona's brightness, although discernible to the eye, are notoriously difficult to photograph. Pictured here, however, using multiple images and digital processing, is a detailed image of the Sun's corona taken during the April 20, 2023 total solar eclipse from Exmouth, Australia. Clearly visible are intricate layers and glowing caustics of an ever changing mixture of hot gas and magnetic fields. Bright looping prominences appear pink just around the Sun's limb. A similar solar corona might be visible through clear skies in a narrow swath across the North America during the total solar eclipse that occurs just six days from today  NASA Coverage: Total Solar Eclipse of 2024 April 8",
    hdurl: "https://apod.nasa.gov/apod/image/2404/CoronaExmouth_Hart_1920.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Detailed View of a Solar Eclipse Corona",
    url: "https://apod.nasa.gov/apod/image/2404/CoronaExmouth_Hart_1080.jpg",
  },
  {
    date: "2024-04-03",
    explanation:
      'What created this unusual celestial firework? The nebula, dubbed Pa 30, appears in the same sky direction now as a bright "guest star" did in the year 1181. Although Pa 30\'s filaments look similar to that created by a nova (for example GK Per), and a planetary nebula (for example NGC 6751), some astronomers now propose that it was created by a rare type of supernova: a thermonuclear Type Iax, and so is (also) named SN 1181.  In this model, the supernova was not the result of the detonation of a single star, but rather a blast that occurred when two white dwarf stars spiraled together and merged.  The blue dot in the center is hypothesized to be a zombie star, the remnant white dwarf that somehow survived this supernova-level explosion.  The featured image combines images and data obtained with infrared (WISE), visible  (MDM, Pan-STARRS), and X-ray (Chandra, XMM) telescopes.  Future observations and analyses may tell us more.   NASA Coverage: Total Solar Eclipse of 2024 April 8',
    hdurl: "https://apod.nasa.gov/apod/image/2404/Pa30_NASA_4350.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Unusual Nebula Pa 30",
    url: "https://apod.nasa.gov/apod/image/2404/Pa30V_NASA_960.jpg",
  },
  {
    copyright: "Dan Bartlett",
    date: "2024-04-04",
    explanation:
      "In dark evening skies over June Lake, northern hemisphere, planet Earth, Comet 12P/Pons-Brooks stood just above the western horizon on March 30. Its twisted turbulent ion tail and diffuse greenish coma are captured in this two degree wide telescopic field of view along with bright yellowish star Hamal also known as Alpha Arietis. Now Pons-Brooks has moved out of the northern night though, approaching perihelion on April 21. On April 8 you might still spot the comet in daytime skies. But to do it, you will have to stand in the path of totality and look away from the spectacle of an alluring solar corona and totally eclipsed Sun.   NASA Coverage: Total Solar Eclipse of 2024 April 8",
    hdurl:
      "https://apod.nasa.gov/apod/image/2404/12P_Pons_Brooks_2024_03_30_JuneLake_DEBartlett.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Comet Pons-Brooks at Night",
    url: "https://apod.nasa.gov/apod/image/2404/12P_Pons_Brooks_2024_03_30_JuneLake_DEBartlett1024.jpg",
  },
  {
    copyright: "Barden Ridge Observatory",
    date: "2024-04-05",
    explanation:
      "Changes in the alluring solar corona are detailed in this creative composite image mapping the dynamic outer atmosphere of the Sun during two separate total solar eclipses. Unwrapped from the complete circle of the eclipsed Sun's edge to a rectangle and mirrored, the entire solar corona is shown during the 2017 eclipse (bottom) seen from Jackson Hole, Wyoming, and the 2023 eclipse from Exmouth, Western Australia. While the 2017 eclipse was near a minimum in the Sun's 11 year activity cycle, the 2023 eclipse was closer to solar maximum. The 2023 solar corona hints at the dramatically different character of the active Sun, with many streamers and pinkish prominences arising along the solar limb. Of course, the solar corona is only easily visible to the eye while standing in the shadow of the Moon.   NASA Coverage: Total Solar Eclipse of 2024 April 8",
    hdurl: "https://apod.nasa.gov/apod/image/2404/CoronaGraph.jpg",
    media_type: "image",
    service_version: "v1",
    title: "The Solar Corona Unwrapped",
    url: "https://apod.nasa.gov/apod/image/2404/CoronaGraph_1024.jpg",
  },
  {
    copyright: "Hubble Heritage Project",
    date: "2024-04-06",
    explanation:
      "The arms of a grand design spiral galaxy 60,000 light-years across are unwound in this digital transformation of the magnificent 2005 Hubble Space Telescope portrait of M51. In fact, M51 is one of the original spiral nebulae, its winding arms described by a mathematical curve known as a logarithmic spiral, a spiral whose separation grows in a geometric way with increasing distance from the center. Applying logarithms to shift the pixel coordinates in the Hubble image relative to the center of M51 maps the galaxy's spiral arms into diagonal straight lines. The transformed image dramatically shows the arms themselves are traced by star formation, lined with pinkish starforming regions and young blue star clusters. Companion galaxy NGC 5195 (top) seems to alter the track of the arm in front of it though, and itself remains relatively unaffected by this unwinding of M51. Also known as the spira mirabilis, logarthimic spirals can be found in nature on all scales. For example, logarithmic spirals can also describe hurricanes, the tracks of subatomic particles in a bubble chamber and, of course, cauliflower.   NASA Coverage: Total Solar Eclipse of 2024 April 8",
    hdurl: "https://apod.nasa.gov/apod/image/2404/M51Unwound.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Unwinding M51",
    url: "https://apod.nasa.gov/apod/image/2404/M51Unwound_crop600.jpg",
  },
  {
    copyright: "\nBen Cooper\n",
    date: "2024-04-07",
    explanation:
      "Will the sky be clear enough to see the eclipse? This question is already on the minds of many North Americans hoping to see tomorrow's solar eclipse.  This question was also on the mind of many people attempting to see the total solar eclipse that crossed North America in August 2017.  Then, the path of total darkness shot across the mainland of the USA from coast to coast, from Oregon to South Carolina -- but, like tomorrow's event, a partial eclipse occurred above most of North America.  Unfortunately, in 2017, many locations saw predominantly clouds. One location that did not was a bank of the Green River Lakes, Wyoming.  Intermittent clouds were far enough away to allow the center image of the featured composite sequence to be taken, an image that shows the corona of the Sun extending out past the central dark Moon that blocks our familiar Sun. The surrounding images show the partial phases of the solar eclipse both before and after totality.   NASA Coverage: Tomorrow's Total Solar Eclipse",
    hdurl:
      "https://apod.nasa.gov/apod/image/2404/EclipseWyoming_Cooper_960.jpg",
    media_type: "image",
    service_version: "v1",
    title: "A Total Solar Eclipse over Wyoming",
    url: "https://apod.nasa.gov/apod/image/2404/EclipseWyoming_Cooper_960.jpg",
  },
  {
    copyright: "\nShengyu Li & Shaining\n",
    date: "2024-04-08",
    explanation:
      "How does a comet tail change? It depends on the comet.  The ion tail of Comet 12P/Pons–Brooks has been changing markedly, as detailed in the featured image sequenced over nine days from March 6 to 14 (top to bottom).  On some days, the comet's ion tail was relatively long and complex, but not every day.  Reasons for tail changes include the rate of ejection of material from the comet's nucleus, the strength and complexity of the passing solar wind, and the rotation rate of the comet.  Over the course of a week, apparent changes even include a change of perspective from the Earth. In general, a comet's ion tail will point away from the Sun, as gas expelled is pushed out by the Sun's wind. Today, Pons-Brooks may become a rare comet suddenly visible in the middle of the day for those able to see the Sun totally eclipsed by the Moon.   NASA Coverage: Today's Total Solar Eclipse  Total Eclipse Imagery: Notable Submissions to APOD",
    hdurl:
      "https://apod.nasa.gov/apod/image/2404/Comet12pTails_ShengyuLi_3000.jpg",
    media_type: "image",
    service_version: "v1",
    title: "The Changing Ion Tail of Comet Pons-Brooks",
    url: "https://apod.nasa.gov/apod/image/2404/Comet12pTails_ShengyuLi_960.jpg",
  },
  {
    copyright: "Stan Honda",
    date: "2024-04-09",
    explanation:
      "Captured in this snapshot, the shadow of the Moon came to Lake Magog, Quebec, North America, planet Earth on April 8. For the lakeside eclipse chasers, the much anticipated total solar eclipse was a spectacle to behold in briefly dark, but clear skies. Of course Lake Magog was one of the last places to be visited by the Moon's shadow. The narrow path of totality for the 2024 total solar eclipse swept from Mexico's Pacific Coast north and eastward through the US and Canada. But a partial eclipse was visible across most of the North American continent.   Total Eclipse Imagery: Notable Submissions to APOD",
    hdurl:
      "https://apod.nasa.gov/apod/image/2404/StanHonda2024TSEMagogCanada.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Moon's Shadow over Lake Magog",
    url: "https://apod.nasa.gov/apod/image/2404/StanHonda2024TSEMagogCanada1200.jpg",
  },
  {
    date: "2024-04-10",
    explanation:
      "What wonders appear when the Moon blocks the Sun? For many eager observers of Monday’s total eclipse of the Sun, the suddenly dark sky included the expected corona and two (perhaps surprise) planets: Venus and Jupiter. Normally, in recent days, Venus is visible only in the morning when the Sun and Jupiter are below the horizon, while Jupiter appears bright only in the evening.  On Monday, though, for well-placed observers, both planets became easily visible during the day right in line with the totally eclipsed Sun. This line was captured Monday afternoon in the featured image from Mount Nebo, Arkansas, USA, along with a line of curious observers — and a picturesque tree.   Monday's Eclipse Imagery: Notable Submissions to APOD",
    hdurl:
      "https://apod.nasa.gov/apod/image/2404/EclipsePlanets_Vetter_1014.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Planets Around a Total Eclipse",
    url: "https://apod.nasa.gov/apod/image/2404/EclipsePlanets_Vetter_960.jpg",
  },
  {
    copyright: "April 8's",
    date: "2024-04-11",
    explanation:
      "Start at the upper left above and you can follow the progress of April 8's total eclipse of the Sun in seven sharp, separate exposures. The image sequence was recorded with a telescope and camera located within the narrow path of totality as the Moon's shadow swept across Newport, Vermont, USA. At center is a spectacular view of the solar corona. The tenuous outer atmosphere of the Sun is only easily visible to the eye in clear dark skies during the total eclipse phase. Seen from Newport, the total phase for this solar eclipse lasted about 3 minutes and 26 seconds.   Monday's Eclipse Imagery: Notable Submissions to APOD",
    hdurl: "https://apod.nasa.gov/apod/image/2404/2024_Eclipse_05XTan.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Eclipse in Seven",
    url: "https://apod.nasa.gov/apod/image/2404/2024_Eclipse_05XTan1024.jpg",
  },
  {
    copyright: "Daniel Korona",
    date: "2024-04-12",
    explanation:
      "Baily's beads often appear at the boundaries of the total phase of an eclipse of the Sun. Pearls of sunlight still beaming through gaps in the rugged terrain along the lunar limb silhouette, their appearance is recorded in this dramatic timelapse composite. The series of images follows the Moon's edge from beginning through the end of totality during April 8's solar eclipse from Durango, Mexico. They also capture pinkish prominences of plasma arcing high above the edge of the active Sun. One of the first places in North America visited by the Moon's shadow on April 8, totality in Durango lasted about 3 minutes and 46 seconds.   Solar Eclipse Imagery: Notable Submissions to APOD",
    hdurl: "https://apod.nasa.gov/apod/image/2404/image0tseKorona.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Total Totality",
    url: "https://apod.nasa.gov/apod/image/2404/image0tseKorona_1100.jpg",
  },
  {
    copyright: "Lori Haffelt",
    date: "2024-04-13",
    explanation:
      "Only those along the narrow track of the Moon's shadow on April 8 saw a total solar eclipse. But most of North America still saw a partial eclipse of the Sun. From Clearwater, Florida, USA this single snapshot captured multiple images of that more widely viewed celestial event without observing the Sun directly. In the shade of a palm tree, criss-crossing fronds are projecting recognizable eclipse images on the ground, pinhole camera style.  In Clearwater the maximum eclipse phase was about 53 percent.   Solar Eclipse Imagery: Notable Submissions to APOD",
    hdurl: "https://apod.nasa.gov/apod/image/2404/pinholepalm.png",
    media_type: "image",
    service_version: "v1",
    title: "Palm Tree Partial Eclipse",
    url: "https://apod.nasa.gov/apod/image/2404/pinholepalm1024.png",
  },
  {
    copyright: "\nDavid Duarte\n",
    date: "2024-04-14",
    explanation:
      "How does a total solar eclipse end? Yes, the Moon moves out from fully blocking the Sun, but in the first few seconds of transition, interesting things appear. The first is called a diamond ring. Light might stream between mountains or through relative lowlands around the Moon's edge, as seen from your location, making this sudden first light, when combined with the corona that surrounds the Moon, look like a diamond ring. Within seconds other light streams appear that are called, collectively, Bailey's beads. In the featured video, it may seem that the pink triangular prominence on the Sun is somehow related to where the Sun begins to reappear, but it is not. Observers from other locations saw Bailey's beads emerge from different places around the Moon, away from the iconic triangular solar prominence visible to all. The video was captured with specialized equipment from New Boston, Texas, USA on April 8, 2024.   Solar Eclipse Imagery: Notable Submissions to APOD",
    media_type: "video",
    service_version: "v1",
    title: "How a Total Solar Eclipse Ended",
    url: "https://www.youtube.com/embed/w5uUcq__vMo?rel=0",
  },
  {
    date: "2024-04-15",
    explanation:
      "Something strange happened to this galaxy, but what? Known as the Cigar Galaxy and cataloged as M82, red glowing gas and dust are being cast out from the center.  Although this starburst galaxy was surely stirred up by a recent pass near its neighbor, large spiral galaxy M81, this doesn't fully explain the source of the red-glowing outwardly expanding gas and dust.  Evidence indicates that this material is being driven out by the combined emerging particle winds of many stars, together creating a galactic superwind. In the featured images, a Hubble Space Telescope image in visible light is shown on the left, while a James Webb Space Telescope image of the central region in infrared light is shown on the right.  Detailed inspection of the new Webb image shows, unexpectedly, that this red-glowing dust is associated with hot plasma. Research into the nature of this strange nearby galaxy will surely continue.    Total Eclipse Imagery: Notable Submissions to APOD",
    hdurl:
      "https://apod.nasa.gov/apod/image/2404/M82Center_HubbleWebb_2000.jpg",
    media_type: "image",
    service_version: "v1",
    title: "The Cigar Galaxy from Hubble and Webb",
    url: "https://apod.nasa.gov/apod/image/2404/M82Center_HubbleWebb_1080.jpg",
  },
  {
    date: "2024-04-16",
    explanation:
      "The explosion is over, but the consequences continue.  About eleven thousand years ago, a star in the constellation of Vela could be seen to explode, creating a strange point of light briefly visible to humans living near the beginning of recorded history.  The outer layers of the star crashed into the interstellar medium, driving a shock wave that is still visible today.  The featured image captures some of that filamentary and gigantic shock in visible light. As gas flies away from the detonated star, it decays and reacts with the interstellar medium, producing light in many different colors and energy bands. Remaining at the center of the Vela Supernova Remnant is a pulsar, a star as dense as nuclear matter that spins around more than ten times in a single second.   Monday's Eclipse Imagery: Notable Submissions to APOD",
    hdurl: "https://apod.nasa.gov/apod/image/2404/VelaSnr_CTIO_3989.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Filaments of the Vela Supernova Remnant",
    url: "https://apod.nasa.gov/apod/image/2404/VelaSnr_CTIO_960.jpg",
  },
  {
    copyright: "\nLin Zixuan\n(Tsinghua U.)\n",
    date: "2024-04-17",
    explanation:
      "Not one, but two comets appeared near the Sun during last week's total solar eclipse. The expected comet was Comet 12P/Pons-Brooks, but it was disappointingly dimmer than many had hoped. However, relatively unknown Comet SOHO-5008 also appeared in long duration camera exposures. This comet was the 5008th comet identified on images taken by ESA & NASA's Sun-orbiting SOHO spacecraft.  Likely much smaller, Comet SOHO-5008 was a sungrazer which disintegrated within hours as it passed too near the Sun.  The featured image is not only unusual for capturing two comets during an eclipse, but one of the rare times that a sungrazing comet has been photographed from the Earth's surface. Also visible in the image is the sprawling corona of our Sun and the planets Mercury (left) and Venus (right).  Of these planets and comets, only Venus was easily visible to millions of people in the dark shadow of the Moon that crossed North America on April 8.    Solar Eclipse Imagery: Notable Submissions to APOD",
    hdurl:
      "https://apod.nasa.gov/apod/image/2404/EclipseComets_Zixuan_6105.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Total Eclipse and Comets",
    url: "https://apod.nasa.gov/apod/image/2404/EclipseComets_Zixuan_1080.jpg",
  },
  {
    copyright: "Neil Corke",
    date: "2024-04-18",
    explanation:
      "From our vantage point in the Milky Way Galaxy, we see NGC 1232 face-on. Nearly 200,000 light-years across, the big, beautiful spiral galaxy is located some 47 million light-years away in the flowing southern constellation of Eridanus. This sharp, multi-color, telescopic image of NGC 1232 includes remarkable details of the distant island universe. From the core outward, the galaxy's colors change from the yellowish light of old stars in the center to young blue star clusters and reddish star forming regions along the grand, sweeping spiral arms. NGC 1232's apparent, small, barred-spiral companion galaxy is cataloged as NGC 1232A. Distance estimates place it much farther though, around 300 million light-years away, and unlikely to be interacting with NGC 1232.  Of course, the prominent bright star with the spiky appearance is much closer than NGC 1232 and lies well within our own Milky Way.",
    hdurl:
      "https://apod.nasa.gov/apod/image/2404/NGC1232_Eye_of_God_Galaxy_fullsize_2024-03-28.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Facing NGC 1232",
    url: "https://apod.nasa.gov/apod/image/2404/NGC1232_Eye_of_God_Galaxy_fullsize_2024-03-28_1024.jpg",
  },
  {
    copyright: "Demison Lopes",
    date: "2024-04-19",
    explanation:
      "A jewel of the southern sky, the Great Carina Nebula is more modestly known as NGC 3372. One of our Galaxy's largest star forming regions, it spans over 300 light-years. Like the smaller, more northerly Great Orion Nebula, the Carina Nebula is easily visible to the unaided eye. But at a distance of 7,500 light-years it lies some 5 times farther away. This stunning telescopic view reveals remarkable details of the region's glowing filaments of interstellar gas and obscuring cosmic dust clouds. The Carina Nebula is home to young, extremely massive stars, including the still enigmatic variable Eta Carinae, a star with well over 100 times the mass of the Sun.  Eta Carinae is the bright star above the central dark notch in this field and left of the dusty Keyhole Nebula (NGC 3324).",
    hdurl: "https://apod.nasa.gov/apod/image/2404/NGC3372_ETA CARINA_LOPES.jpg",
    media_type: "image",
    service_version: "v1",
    title: "The Great Carina Nebula",
    url: "https://apod.nasa.gov/apod/image/2404/NGC3372_ETA CARINA_LOPES1024.jpg",
  },
  {
    copyright: "Wright Dobbs",
    date: "2024-04-20",
    explanation:
      "When the dark shadow of the Moon raced across North America on April 8, sky watchers along the shadow's narrow central path were treated to a total solar eclipse. During the New Moon's shadow play diamonds glistened twice in the eclipse-darkened skies. The transient celestial jewels appeared immediately before and after the total eclipse phase. That's when the rays of a vanishing and then emerging sliver of solar disk are just visible behind the silhouetted Moon's edge, creating the appearance of a shiny diamond set in a dark ring. This dramatic timelapse composite from north-central Arkansas captures both diamond ring moments of this total solar eclipse. The diamond rings are separated by the ethereal beauty of the solar corona visible during totality.",
    hdurl: "https://apod.nasa.gov/apod/image/2404/tse2024Dobbs.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Diamonds in the Sky",
    url: "https://apod.nasa.gov/apod/image/2404/tse2024Dobbs_1024.jpg",
  },
  {
    date: "2024-04-21",
    explanation:
      "Watch Juno zoom past Jupiter.  NASA's robotic spacecraft Juno is continuing on its now month-long, highly-elongated orbits around our Solar System's largest planet.  The featured video is from perijove 16, the sixteenth time that Juno passed near Jupiter since it arrived in mid-2016. Each perijove passes near a slightly different part of Jupiter's cloud tops.  This color-enhanced video has been digitally composed from 21 JunoCam still images, resulting in a 125-fold time-lapse. The video begins with Jupiter rising as Juno approaches from the north. As Juno reaches its closest view -- from about 3,500 kilometers over Jupiter's cloud tops -- the spacecraft captures the great planet in tremendous detail. Juno passes light zones and dark belts of clouds that circle the planet, as well as numerous swirling circular storms, many of which are larger than hurricanes on Earth.  As Juno moves away, the remarkable dolphin-shaped cloud is visible.  After the perijove, Jupiter recedes into the distance, now displaying the unusual clouds that appear over Jupiter's south.  To get desired science data, Juno swoops so close to Jupiter that its instruments are exposed to very high levels of radiation.",
    media_type: "video",
    service_version: "v1",
    title: "Perijove 16: Passing Jupiter",
    url: "https://www.youtube.com/embed/c4TU3arrZR8?rel=0",
  },
  {
    copyright: "\nDario Giannobile\n",
    date: "2024-04-22",
    explanation:
      "Yes, but can your volcano do this? To the surprise of some, Mt. Etna emits, on occasion, smoke rings. Technically known as vortex rings, the walls of the volcano slightly slow the outside of emitted smoke puffs, causing the inside gas to move faster.  A circle of low pressure develops so that the emitted puff of volcanic gas and ash loops around in a ring, a familiar geometric structure that can be surprisingly stable as it rises. Smoke rings are quite rare and need a coincidence of the right geometry  of the vent, the right speed of ejected smoke, and the relative calmness of the outside atmosphere.  In the featured image taken about two weeks ago from Gangi, Sicily, Italy, multiple volcanic smoke rings are visible.  The scene is shaded by the red light of a dawn Sun, while a crescent Moon is visible in the background.",
    hdurl:
      "https://apod.nasa.gov/apod/image/2404/EtnaRingsMoonCrop_Giannobile_960.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Moon and Smoke Rings from Mt. Etna",
    url: "https://apod.nasa.gov/apod/image/2404/EtnaRingsMoonCrop_Giannobile_960.jpg",
  },
  {
    copyright: "\nFatih Ekmen\n",
    date: "2024-04-23",
    explanation:
      "What created this giant X in the clouds? It was the shadow of contrails. When airplanes fly, humid engine exhaust may form water droplets that might freeze in Earth's cold upper atmosphere.  These persistent streams of water and ice scatter light from the Sun above and so appear bright. These contrails cast long shadows.  That was just the case over Istanbul, Türkiye, earlier this month. Contrails occur all over planet Earth and, generally, warm the Earth when the trap infrared light but cool the Earth when they efficiently reflect sunlight. The image was taken by a surprised photographer in the morning on the way to work.",
    hdurl: "https://apod.nasa.gov/apod/image/2404/ContrailX_Ekmen_2268.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Contrail Shadow X",
    url: "https://apod.nasa.gov/apod/image/2404/ContrailX_Ekmen_960.jpg",
  },
  {
    copyright: "\nRowan Prangley\n",
    date: "2024-04-24",
    explanation:
      "How did a star form this beautiful nebula?  In the middle of emission nebula NGC 6164 is an unusually massive star.  The central star has been compared to an oyster's pearl and an egg protected by the mythical sky dragons of Ara.  The star, visible in the center of the featured image and catalogued as HD 148937, is so hot that the ultraviolet light it emits heats up gas that surrounds it.  That gas was likely thrown off from the star previously, possibly the result of a gravitational interaction with a looping stellar companion.  Expelled material might have been channeled by the magnetic field of the massive star, in all creating the symmetric shape of the bipolar nebula.  NGC 6164 spans about four light years and is located about 3,600 light years away toward the southern constellation Norma.   New Mirror: APOD now available via WhatsApp",
    hdurl: "https://apod.nasa.gov/apod/image/2404/DragonsEgg_Prangley_4688.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Dragon's Egg Bipolar Emission Nebula",
    url: "https://apod.nasa.gov/apod/image/2404/DragonsEgg_Prangley_960.jpg",
  },
  {
    date: "2024-04-25",
    explanation:
      "Located some 3 million light-years away in the arms of nearby spiral galaxy M33, giant stellar nursery NGC 604 is about 1,300 light-years across. That's nearly 100 times the size of the Milky Way's Orion Nebula, the closest large star forming region to planet Earth. In fact, among the star forming regions within the Local Group of galaxies, NGC 604 is second in size only to 30 Doradus, also known as the Tarantula Nebula in the Large Magellanic Cloud. Cavernous bubbles and cavities in NGC 604 fill this stunning infrared image from the James Webb Space Telescope's NIRCam. They are carved out by energetic stellar winds from the region's more than 200 hot, massive, young stars, all still in early stages of their lives.",
    hdurl: "https://apod.nasa.gov/apod/image/2404/stsci-xNGC604NIRcam2048.png",
    media_type: "image",
    service_version: "v1",
    title: "NGC 604: Giant Stellar Nursery",
    url: "https://apod.nasa.gov/apod/image/2404/stsci-xNGC604NIRcam1024.png",
  },
  {
    copyright: "Markus Horn",
    date: "2024-04-26",
    explanation:
      "In northern hemisphere spring, bright star Regulus is easy to spot above the eastern horizon. The alpha star of the constellation Leo, Regulus is the spiky star centered in this telescopic field of view. A mere 79 light-years distant, Regulus is a hot, rapidly spinning star that is known to be part of a multiple star system. Not quite lost in the glare, the fuzzy patch just below Regulus is diffuse starlight from small galaxy Leo I. Leo I is a dwarf spheroidal galaxy, a member of the Local Group of galaxies dominated by our Milky Way Galaxy and the Andromeda Galaxy (M31). About 800 thousand light-years away, Leo I is thought to be the most distant of the known small satellite galaxies orbiting the Milky Way. But dwarf galaxy Leo I has shown evidence of a supermassive black hole at its center, comparable in mass to the black hole at the center of the Milky Way.",
    hdurl:
      "https://apod.nasa.gov/apod/image/2404/Regulus_Dwarf_by_Markus_Horn2048.png",
    media_type: "image",
    service_version: "v1",
    title: "Regulus and the Dwarf Galaxy",
    url: "https://apod.nasa.gov/apod/image/2404/Regulus_Dwarf_by_Markus_Horn1024.png",
  },
  {
    copyright: "Tunc Tezel",
    date: "2024-04-27",
    explanation:
      "If the Sun is up but the sky is dark and the horizon is bright all around, you might be standing in the Moon's shadow during a total eclipse of the Sun. In fact, the all-sky Moon shadow shown in this composited panoramic view was captured from a farm near Shirley, Arkansas, planet Earth. The exposures were made under clear skies during the April 8 total solar eclipse. For that location near the center line of the Moon's shadow track, totality lasted over 4 minutes. Along with the solar corona surrounding the silhouette of the Moon planets and stars were visible during the total eclipse phase. Easiest to see here are bright planets Venus and Jupiter, to the lower right and upper left of the eclipsed Sun.",
    hdurl: "https://apod.nasa.gov/apod/image/2404/20240408h14.jpg",
    media_type: "image",
    service_version: "v1",
    title: "All Sky Moon Shadow",
    url: "https://apod.nasa.gov/apod/image/2404/tse20240408h14_1024.jpg",
  },
  {
    copyright: "\nRobert Gendler\n",
    date: "2024-04-28",
    explanation:
      "The Ring Nebula (M57) is more complicated than it appears through a small telescope.  The easily visible central ring is about one light-year across, but this remarkably deep exposure - a collaborative effort combining data from three different large telescopes - explores the looping filaments of glowing gas extending much farther from the nebula's central star. This composite image includes red light emitted by hydrogen as well as visible and infrared light. The Ring Nebula is an elongated planetary nebula, a type of nebula created when a Sun-like star evolves to throw off its outer atmosphere and become a white dwarf star.  The Ring Nebula is about 2,500 light-years away toward the musical constellation Lyra.   Your Sky Surprise: What picture did APOD feature on your birthday? (post 1995)",
    hdurl:
      "https://apod.nasa.gov/apod/image/2404/M57Ring_HubbleGendler_3000.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Rings Around the Ring Nebula",
    url: "https://apod.nasa.gov/apod/image/2404/M57Ring_HubbleGendler_960.jpg",
  },
  {
    copyright: "Juan Carlos Casado",
    date: "2024-04-29",
    explanation:
      "Three bright objects satisfied seasoned stargazers of the western sky just after sunset earlier this month. The most familiar was the Moon, seen on the upper left in a crescent phase. The rest of the Moon was faintly visible by sunlight first reflected by the Earth. The bright planet Jupiter, the largest planet in the Solar System, is seen to the upper left.  Most unusual was Comet 12P/Pons-Brooks, below the Moon and showing a stubby dust tail on the right but an impressive ion tail extending upwards.  The featured image, a composite of several images taken consecutively at the same location and with the same camera, was taken near the village of Llers, in Spain's Girona province.  Comet Pons-Brooks passed its closest to the Sun last week and is now dimming as it moves into southern skies and returns to the outer Solar System.   Almost Hyperspace: Random APOD Generator",
    hdurl: "https://apod.nasa.gov/apod/image/2404/CometTriple_Casado_2000.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Comet, Planet, Moon",
    url: "https://apod.nasa.gov/apod/image/2404/CometTriple_Casado_1080.jpg",
  },
  {
    copyright: "\nDeep Sky Collective\n",
    date: "2024-04-30",
    explanation:
      "The star system GK Per is known to be associated with only two of the three nebulas pictured.  At 1500 light years distant, Nova Persei 1901 (GK Persei) was the second closest nova yet recorded. At the very center is a white dwarf star, the surviving core of a former Sun-like star. It is surrounded by the circular Firework nebula, gas that was ejected by a thermonuclear explosion on the white dwarf's surface -- a nova -- as recorded in 1901. The red glowing gas surrounding the Firework nebula is the atmosphere that used to surround the central star. This gas was expelled before the nova and appears as a diffuse planetary nebula.  The faint gray gas running across is interstellar cirrus that seems to be just passing through coincidently. In 1901, GK Per's nova became brighter than Betelgeuse. Similarly, star system T CrB is expected to erupt in a nova later this year, but we don't know exactly when nor how bright it will become.",
    hdurl: "https://apod.nasa.gov/apod/image/2404/GKPerWide_DSC_4329.jpg",
    media_type: "image",
    service_version: "v1",
    title: "GK Per: Nova and Planetary Nebula",
    url: "https://apod.nasa.gov/apod/image/2404/GKPerWide_DSC_960.jpg",
  },
  {
    copyright: "\nRoberto Colombari & \nMauro Narduzzi\n",
    date: "2024-05-01",
    explanation:
      "To some, this nebula looks like the head of a fish. However, this colorful cosmic portrait really features glowing gas and obscuring dust clouds in IC 1795, a star forming region in the northern constellation Cassiopeia. The nebula's colors were created by adopting the Hubble color palette for mapping narrowband emissions from oxygen, hydrogen, and sulfur atoms to blue, green and red colors, and further blending the data with images of the region recorded through broadband filters. Not far on the sky from the famous Double Star Cluster in Perseus, IC 1795 is itself located next to IC 1805, the Heart Nebula, as part of a complex of star forming regions that lie at the edge of a large molecular cloud. Located just over 6,000 light-years away, the larger star forming complex sprawls along the Perseus spiral arm of our Milky Way Galaxy. At that distance, IC 1795 would span about 70 light-years across.   Open Science: Browse 3,300+ codes in the Astrophysics Source Code Library",
    hdurl: "https://apod.nasa.gov/apod/image/2405/FishheadB_Colombari_2704.jpg",
    media_type: "image",
    service_version: "v1",
    title: "IC 1795: The Fishhead Nebula",
    url: "https://apod.nasa.gov/apod/image/2405/FishheadB_Colombari_960.jpg",
  },
  {
    copyright: "Drew Evans",
    date: "2024-05-02",
    explanation:
      "Majestic on a truly cosmic scale, M100 is appropriately known as a grand design spiral galaxy.  The large galaxy of over 100 billion stars has well-defined spiral arms, similar to our own Milky Way.  One of the brightest members of the Virgo Cluster of galaxies, M100, also known as NGC 4321 is 56 million light-years distant toward the well-groomed constellation Coma Berenices.  In this telescopic image, the face-on grand design spiral shares a nearly 1 degree wide field-of-view with slightly less conspicuous edge-on spiral NGC 4312 (at upper right). The 21 hour long equivalent exposure from a dark sky site near Flagstaff, Arizona, planet Earth, reveals M100's bright blue star clusters and intricate winding dust lanes which are hallmarks of this class of galaxies.  Measurements of variable stars in M100 have played an important role in determining the size and age of the Universe.",
    hdurl: "https://apod.nasa.gov/apod/image/2405/M100_DrewEvans.png",
    media_type: "image",
    service_version: "v1",
    title: "M100: A Grand Design Spiral Galaxy",
    url: "https://apod.nasa.gov/apod/image/2405/M100_DrewEvans1024.png",
  },
  {
    date: "2024-05-03",
    explanation:
      "A mere 280 light-years from Earth, tidally locked, Jupiter-sized exoplanet WASP-43b orbits its parent star once every 0.8 Earth days. That puts it about 2 million kilometers (less than 1/25th the orbital distance of Mercury) from a small, cool sun. Still, on a dayside always facing its parent star, temperatures approach a torrid 2,500 degrees F as measured at infrared wavelengths by the MIRI instrument on board the James Webb Space Telescope. In this illustration of the hot exoplanet's orbit, Webb measurements also show nightside temperatures remain above 1,000 degrees F. That suggests that strong equatorial winds circulate the dayside atmospheric gases to the nightside before they can completely cool off. Exoplanet WASP-43b is now formally known as Astrolábos, and its K-type parent star has been christened Gnomon. Webb's infrared spectra indicate water vapor is present on the nightside as well as the dayside of the planet, providing information about cloud cover on Astrolábos.",
    hdurl:
      "https://apod.nasa.gov/apod/image/2405/STScI-WASP43b_temperature.png",
    media_type: "image",
    service_version: "v1",
    title: "Temperatures on Exoplanet WASP-43b",
    url: "https://apod.nasa.gov/apod/image/2405/STScI-WASP43b_temperature.png",
  },
  {
    copyright: "Yuri Beletsky",
    date: "2024-05-04",
    explanation:
      "Despite their resemblance to R2D2, these three are not the droids you're looking for. Instead, the enclosures house 1.8 meter Auxiliary Telescopes (ATs) at Paranal Observatory in the Atacama Desert region of Chile. The ATs are designed to be used for interferometry, a technique for achieving extremely high resolution observations, in concert with the observatory's 8 meter Very Large Telescope units. A total of four ATs are operational, each fitted with a transporter that moves the telescope along a track allowing different arrays with the large unit telescopes. To work as an interferometer, the light from each telescope is brought to a common focal point by a system of mirrors in underground tunnels. Above these three ATs, the Large and Small Magellanic Clouds are the far, far away satellite galaxies of our own Milky Way. In the clear and otherwise dark southern skies, planet Earth's greenish atmospheric airglow stretches faintly along the horizon.",
    hdurl: "https://apod.nasa.gov/apod/image/2405/three_ats_beletsky.jpg",
    media_type: "image",
    service_version: "v1",
    title: "3 ATs",
    url: "https://apod.nasa.gov/apod/image/2405/three_ats_beletsky.jpg",
  },
  {
    date: "2024-05-05",
    explanation:
      "What happens to a star that goes near a black hole? If the star directly impacts a massive black hole, then the star falls in completely -- and everything vanishes. More likely, though, the star goes close enough to have the black hole's gravity pull away its outer layers, or disrupt, the star. Then, most of the star's gas does not fall into the black hole.  These stellar tidal disruption events can be as bright as a supernova, and an increasing amount of them are being discovered by automated sky surveys. In the featured artist's illustration, a star has just passed a massive black hole and sheds gas that continues to orbit.  The inner edge of a disk of gas and dust surrounding the black hole is heated by the disruption event and may glow long after the star  is gone.    Hole New Worlds: It's Black Hole Week at NASA!",
    hdurl: "https://apod.nasa.gov/apod/image/2405/BhShredder_NASA_3482.jpg",
    media_type: "image",
    service_version: "v1",
    title: "A Black Hole Disrupts a Passing Star",
    url: "https://apod.nasa.gov/apod/image/2405/BhShredder_NASA_1080.jpg",
  },
  {
    copyright:
      "\nReinhold Wittich;\nMusic: Sunrise from \nAlso sprach Zarathusra \n(R. Strauss) \nby Sascha Ende\n",
    date: "2024-05-06",
    explanation:
      "This is how the Sun disappeared from the daytime sky last month. The featured time-lapse video was created from stills taken from Mountain View, Arkansas, USA on 2024 April 8. First, a small sliver of a normally spotted Sun went strangely dark. Within a few minutes, much of the background Sun was hidden behind the advancing foreground Moon. Within an hour, the only rays from the Sun passing the Moon appeared like a diamond ring. During totality, most of the surrounding sky went dark, making the bright pink prominences around the Sun's edge stand out, and making the amazing corona appear to spread into the surrounding sky.  The central view of the corona shows an accumulation of frames taken during complete totality. As the video ends, just a few minutes later, another diamond ring appeared -- this time on the other side of the Moon. Within the next hour, the sky returned to normal.   Celebrate the Voids: It's Black Hole Week at NASA!",
    media_type: "video",
    service_version: "v1",
    title: "A Total Solar Eclipse from Sliver to Ring",
    url: "https://www.youtube.com/embed/28gtfSziCgU?rel=0",
  },
  {
    date: "2024-05-07",
    explanation:
      "What happens when a black hole devours a star?  Many details remain unknown, but observations are providing new clues. In 2014, a powerful explosion was recorded by the ground-based robotic telescopes of the All Sky Automated Survey for SuperNovae (Project ASAS-SN), with followed-up observations by instruments including NASA's Earth-orbiting Swift satellite. Computer modeling of these emissions fit a star being ripped apart by a distant supermassive black hole.  The results of such a collision are portrayed in the featured artistic illustration. The black hole itself is a depicted as a tiny black dot in the center. As matter falls toward the hole, it collides with other matter and heats up. Surrounding the black hole is an accretion disk of hot matter that used to be the star, with a jet emanating from the black hole's spin axis.   Fall towards eternity: It's Black Hole Week at NASA!",
    hdurl: "https://apod.nasa.gov/apod/image/2405/BlackHole_Simonnet_2491.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Black Hole Accreting with Jet",
    url: "https://apod.nasa.gov/apod/image/2405/BlackHole_Simonnet_960.jpg",
  },
  {
    date: "2024-05-08",
    explanation:
      "What would it look like to circle a black hole? If the black hole was surrounded by a swirling disk of glowing and accreting gas, then the great gravity of the black hole would deflect light emitted by the disk to make it look very unusual. The featured animated video gives a visualization. The video starts with you, the observer, looking toward the black hole from just above the plane of the accretion disk.  Surrounding the central black hole is a thin circular image of the orbiting disk that marks the position of the photon sphere -- inside of which lies the black hole's event horizon.  Toward the left, parts of the large main image of the disk appear brighter as they move toward you. As the video continues, you loop over the black hole, soon looking down from the top, then passing through the disk plane on the far side, then returning to your original vantage point. The accretion disk does some interesting image inversions -- but never appears flat. Visualizations such as this are particularly relevant today as black holes are being imaged in unprecedented detail by the Event Horizon Telescope.   Singularity Impressive: It's Black Hole Week at NASA!",
    media_type: "video",
    service_version: "v1",
    title: "Visualization: A Black Hole Accretion Disk",
    url: "https://www.youtube.com/embed/l36UkYtq6m0?rel=0",
  },
  {
    date: "2024-05-09",
    explanation:
      "Bright elliptical galaxy Messier 87 (M87) is home to the supermassive black hole captured in 2017 by planet Earth's Event Horizon Telescope in the first ever image of a black hole. Giant of the Virgo galaxy cluster about 55 million light-years away, M87 is rendered in blue hues in this infrared image from the Spitzer Space telescope.  Though M87 appears mostly featureless and cloud-like, the Spitzer image does record details of relativistic jets blasting from the galaxy's central region. Shown in the inset at top right, the jets themselves span thousands of light-years. The brighter jet seen on the right is approaching and close to our line of sight. Opposite, the shock created by the otherwise unseen receding jet lights up a fainter arc of material. Inset at bottom right, the historic black hole image is shown in context at the center of giant galaxy, between the relativistic jets. Completely unresolved in the Spitzer image, the supermassive black hole surrounded by infalling material is the source of enormous energy driving the relativistic jets from the center of active galaxy M87. The Event Horizon Telescope image of M87 has been enhanced to reveal a sharper view of the famous supermassive black hole.   It's inescapable: Black Hole Week at NASA!",
    hdurl: "https://apod.nasa.gov/apod/image/2405/pia23122c-16.jpg",
    media_type: "image",
    service_version: "v1",
    title: "The Galaxy, the Jet, and a Famous Black Hole",
    url: "https://apod.nasa.gov/apod/image/2405/pia23122c-16_1067.jpg",
  },
  {
    date: "2024-05-10",
    explanation:
      "Relax and watch two black holes merge. Inspired by the first direct detection of gravitational waves in 2015, this simulation plays in slow motion but would take about one third of a second if run in real time. Set on a cosmic stage, the black holes are posed in front of stars, gas, and dust. Their extreme gravity lenses the light from behind them into Einstein rings as they spiral closer and finally merge into one. The otherwise invisible gravitational waves generated as the massive objects rapidly coalesce cause the visible image to ripple and slosh both inside and outside the Einstein rings even after the black holes have merged. Dubbed GW150914, the gravitational waves detected by LIGO are consistent with the merger of 36 and 31 solar mass black holes at a distance of 1.3 billion light-years. The final, single black hole has 63 times the mass of the Sun, with the remaining 3 solar masses converted into energy radiated in gravitational waves.   Today's Event Horizon: It's Black Hole Week at NASA!",
    media_type: "video",
    service_version: "v1",
    title: "Simulation: Two Black Holes Merge",
    url: "https://www.youtube.com/embed/I_88S8DWbcU?rel=0",
  },
  {
    copyright:
      "\nFranco Fantasia & \nGuiseppe Conzo \n(Gruppo Astrofili Palidoro)\n",
    date: "2024-05-11",
    explanation:
      "Right now, one of the largest sunspot groups in recent history is crossing the Sun. Active Region 3664 is not only big -- it's violent, throwing off clouds of particles into the Solar System. Some of these CMEs are already impacting the Earth, and others might follow.  At the extreme, these solar storms could cause some Earth-orbiting satellites to malfunction, the Earth's atmosphere to slightly distort, and electrical power grids to surge. When impacting Earth's upper atmosphere, these particles can produce beautiful auroras, with some auroras already being reported unusually far south.  Pictured here, AR3664 and its dark sunspots were captured yesterday in visible light from Rome, Italy. The AR3664 sunspot group is so large that it is visible just with glasses designed to view last month's total solar eclipse.  This weekend, skygazing enthusiasts will be keenly watching the night skies all over the globe for bright and unusual auroras.   Gallery: Active Region 3664 on the Sun and Associated Aurora",
    hdurl: "https://apod.nasa.gov/apod/image/2405/SunAr3664_Fantasia_3216.jpg",
    media_type: "image",
    service_version: "v1",
    title: "AR 3664: Giant Sunspot Group",
    url: "https://apod.nasa.gov/apod/image/2405/SunAr3664_Fantasia_960.jpg",
  },
  {
    copyright: "\nMariusz Durlej\n",
    date: "2024-05-12",
    explanation:
      "Northern lights don't usually reach this far south.  Magnetic chaos in the Sun's huge Active Region 3664, however, produced a surface explosion that sent a burst of electrons, protons, and more massive, charged nuclei into the Solar System. A few days later, that coronal mass ejection (CME) impacted the Earth and triggered auroras that are being reported unusually far from our planet's north and south poles.  The free sky show might not be over -- the sunspot rich AR3664 has ejected even more CMEs that might also impact the Earth tonight or tomorrow. That active region is now near the Sun's edge, though, and will soon be rotating away from the Earth.  Pictured, a red and rayed aurora was captured in a single 6-second exposure from Racibórz, Poland early last night.  The photographer's friend, seeing an aurora for the first time, is visible in the distance also taking images of the beautifully colorful nighttime sky.   Gallery: Global Aurora from Solar Active Region 3664",
    hdurl: "https://apod.nasa.gov/apod/image/2405/AuroraPoland_Durlej_1940.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Red Aurora over Poland",
    url: "https://apod.nasa.gov/apod/image/2405/AuroraPoland_Durlej_960.jpg",
  },
  {
    copyright: "\nMarco Meniero\n",
    date: "2024-05-13",
    explanation:
      "It was larger than the Earth. It was so big you could actually see it on the Sun's surface without magnification. It contained powerful and tangled magnetic fields as well as numerous dark sunspots. Labelled AR 3664, it developed into one of the most energetic areas seen on the Sun in recent years, unleashing a series of explosions that led to a surge of energetic particles striking the Earth, which created beautiful auroras. And might continue.  Although active regions on the Sun like AR 3664 can be quite dangerous, this region's Coronal Mass Ejections have not done, as yet, much damage to Earth-orbiting satellites or Earth-surface electrical grids. Pictured, the enormous active region was captured on the setting Sun a few days ago from  Civitavecchia, Rome, Italy. The composite image includes a very short exposure taken of just the Sun's surface, but mimics what was actually visible.  Finally, AR 3664 is now rotating away from the Earth, although the region may survive long enough to come around again.    Gallery: Earth Aurora from Solar Active Region 3664",
    hdurl: "https://apod.nasa.gov/apod/image/2405/SunAr3664_Menario_1508.jpg",
    media_type: "image",
    service_version: "v1",
    title: "AR 3664 on a Setting Sun",
    url: "https://apod.nasa.gov/apod/image/2405/SunAr3664_Menario_960.jpg",
  },
  {
    copyright: "Sergio Eguivar",
    date: "2024-05-14",
    explanation:
      "For the mostly harmless denizens of planet Earth, the brighter stars of open cluster NGC 2169 seem to form a cosmic 37. Did you expect 42? From our perspective, the improbable numerical asterism appears solely by chance. It lies at an estimated distance of 3,300 light-years toward the constellation Orion. As far as galactic or open star clusters go, NGC 2169 is a small one, spanning about 7 light-years.  Formed at the same time from the same cloud of dust and gas, the stars of NGC 2169 are only about 11 million years old. Such clusters are expected to disperse over time as they encounter other stars, interstellar clouds, and experience gravitational tides while hitchhiking through the galaxy. Over four billion years ago, our own Sun was likely formed in a similar open cluster of stars.   Gallery: Earth Aurora from Solar Active Region 3664",
    hdurl: "https://apod.nasa.gov/apod/image/2405/NGC2169LRGBQHY183HR.jpg",
    media_type: "image",
    service_version: "v1",
    title: "The 37 Cluster",
    url: "https://apod.nasa.gov/apod/image/2405/NGC2169LRGBQHY183HR_c1024.jpg",
  },
  {
    copyright: "\nSebastian Voltmer\n",
    date: "2024-05-15",
    explanation:
      "What did the monster active region that created the recent auroras look like when at the Sun's edge? There, AR 3664 better showed its 3D structure. Pictured, a large multi-pronged solar prominence was captured extending from chaotic sunspot region AR 3664 out into space, just one example of the particle clouds ejected from this violent solar region. The Earth could easily fit under this long-extended prominence.  The featured image was captured two days ago from this constantly changing region. Yesterday, the strongest solar flare in years was expelled (not shown), a blast classified in the upper X-class. Ultraviolet light from that flare quickly hit the Earth's atmosphere and caused shortwave radio blackouts across both North and South America. Although now rotated to be facing slightly away from the Earth, particles from AR 3664 and subsequent coronal mass ejections (CMEs) might still follow curved magnetic field lines across the inner Solar System and create more Earthly auroras.    Gallery: Earth Aurora from Solar Active Region 3664",
    hdurl: "https://apod.nasa.gov/apod/image/2405/AR3664Prom_Voltmer_1728.jpg",
    media_type: "image",
    service_version: "v1",
    title: "AR 3664 at the Sun's Edge",
    url: "https://apod.nasa.gov/apod/image/2405/AR3664Prom_Voltmer_960.jpg",
  },
  {
    copyright: "Wright Dobbs",
    date: "2024-05-16",
    explanation:
      "A familiar sight from Georgia, USA, the Moon sets near the western horizon in this rural night skyscape. Captured on May 10 before local midnight, the image overexposes the Moon's bright waxing crescent at left in the frame. A long irrigation rig stretches across farmland about 15 miles north of the city of Bainbridge. Shimmering curtains of aurora shine across the starry sky, definitely an unfamiliar sight for southern Georgia nights. Last weekend, extreme geomagnetic storms triggered by the recent intense activity from solar active region AR 3664 brought epic displays of aurora, usually seen closer to the poles, to southern Georgia and even lower latitudes on planet Earth. As solar activity ramps up, more storms are possible.   AuroraSaurus: Report your aurora observations",
    hdurl:
      "https://apod.nasa.gov/apod/image/2405/WrightDobbs_Georgia_Aurora_2.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Aurora Georgia",
    url: "https://apod.nasa.gov/apod/image/2405/WrightDobbs_Georgia_Aurora_2_1024.jpg",
  },
  {
    copyright: "Kavan Chay",
    date: "2024-05-17",
    explanation:
      "This well-composed composite panoramic view looks due south from Banks Peninsula near Christchurch on New Zealand's South Island. The base of a tower-like rocky sea stack is awash in the foreground, with stars of the Southern Cross at the top of the frame and planet Earth's south celestial pole near center. Still, captured on May 11, vibrant aurora australis dominate the starry southern sea and skyscape. The shimmering southern lights were part of extensive auroral displays that entertained skywatchers in northern and southern hemispheres around planet Earth, caused by intense geomagnetic storms. The extreme spaceweather was triggered by the impact of coronal mass ejections launched from powerful solar active region AR 3664.   AuroraSaurus: Report your aurora observations",
    hdurl: "https://apod.nasa.gov/apod/image/2405/DSC_6363Panorama-2.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Aurora Banks Peninsula",
    url: "https://apod.nasa.gov/apod/image/2405/DSC_6363Panorama-2_600.jpg",
  },
  {
    copyright: "Chirag Upreti",
    date: "2024-05-18",
    explanation:
      "Graceful star trail arcs reflect planet Earth's daily rotation in this colorful night skyscape. To create the timelapse composite, on May 12 consecutive exposures were recorded with a camera fixed to a tripod on the shores of the Ashokan Reservoir, in the Catskills region of New York, USA. North star Polaris is near the center of the star trail arcs. The broad trail of a waxing crescent Moon is on the left, casting a strong reflection across the reservoir waters. With intense solar activity driving recent geomagnetic storms, the colorful aurora borealis or northern lights, rare to the region, shine under Polaris and the north celestial pole.   AuroraSaurus: Report your aurora observations",
    hdurl:
      "https://apod.nasa.gov/apod/image/2405/AuroraStartrails_chiragupreti.jpg",
    media_type: "image",
    service_version: "v1",
    title: "North Celestial Aurora",
    url: "https://apod.nasa.gov/apod/image/2405/AuroraStartrails_chiragupreti1024.jpg",
  },
  {
    date: "2024-05-19",
    explanation:
      "Take this simulated plunge and dive into the upper atmosphere of Jupiter, the Solar System's ruling gas giant. The awesome animation is based on image data from JunoCam, and the microwave radiometer on board the Jupiter-orbiting Juno spacecraft. Your view will start about 3,000 kilometers above the southern Jovian cloud tops, and you can track your progress on the display at the left. As altitude decreases, temperature increases while you dive deeper at the location of Jupiter's famous Great Red Spot. In fact, Juno data indicates the Great Red Spot, the Solar System's largest storm system, penetrates some 300 kilometers into the giant planet's atmosphere. For comparison, the deepest point for planet Earth's oceans is just under 11 kilometers down. Don't worry though, you'll fly back out again.   Dive into the Universe: Random APOD Generator",
    media_type: "video",
    service_version: "v1",
    title: "Jupiter Diving",
    url: "https://www.youtube.com/embed/uj3Lq7Gu94Y?rel=0",
  },
  {
    copyright: "\nXuecheng Liu & \nYuxuan Liu\n",
    date: "2024-05-20",
    explanation:
      "It seemed like night, but part of the sky glowed purple.  It was the now famous night of May 10, 2024, when people over much of the world reported beautiful aurora-filled skies. The featured image was captured this night during early morning hours from Arlington, Wisconsin, USA. The panorama is a composite of several 6-second exposures covering two thirds of the visible sky, with north in the center, and processed to heighten the colors and remove electrical wires. The photographer (in the foreground) reported that the aurora appeared to flow from a point overhead but illuminated the sky only toward the north. The aurora's energetic particles originated from CMEs ejected from our Sun over sunspot AR 3664 a few days before. This large active region rotated to the far side of the Sun last week, but may well survive to rotate back toward the Earth next week.",
    hdurl: "https://apod.nasa.gov/apod/image/2405/AuroraWisconsin_Liu_6000.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Aurora Dome Sky",
    url: "https://apod.nasa.gov/apod/image/2405/AuroraWisconsin_Liu_960.jpg",
  },
  {
    date: "2024-05-21",
    explanation:
      'Can a gas cloud eat a galaxy?  It\'s not even close.  The "claw" of this odd looking "creature" in the featured photo is a gas cloud known as a cometary globule.  This globule, however, has ruptured.  Cometary globules are typically characterized by dusty heads and elongated tails.  These features cause cometary globules to have visual similarities to comets, but in reality they are very much different.  Globules are frequently the birthplaces of stars, and many show very young stars in their heads. The reason for the rupture in the head of this object is not yet known. The galaxy to the left of the globule is huge, very far in the distance, and only placed near CG4 by chance superposition.',
    hdurl:
      "https://apod.nasa.gov/apod/image/2405/Cg4Galaxy_CtioRector_1476.jpg",
    media_type: "image",
    service_version: "v1",
    title: "CG4: The Globule and the Galaxy",
    url: "https://apod.nasa.gov/apod/image/2405/Cg4Galaxy_CtioRector_960.jpg",
  },
  {
    copyright: "\nGöran Strand\n",
    date: "2024-05-22",
    explanation:
      "It was bright and green and stretched across the sky. This striking aurora display was captured in 2016 just outside of Östersund, Sweden. Six photographic fields were merged to create the featured panorama spanning almost 180 degrees.  Particularly striking aspects of this aurora include its sweeping arc-like shape and its stark definition.  Lake Storsjön is seen in the foreground, while several familiar constellations and the star Polaris are visible through the aurora, far in the background.  Coincidently, the aurora appears to avoid the Moon visible on the lower left.  The aurora appeared a day after a large hole opened in the Sun's corona, allowing particularly energetic particles to flow out into the Solar System.  The green color of the aurora is caused by oxygen atoms recombining with ambient electrons high in the Earth's atmosphere.   Your Sky Surprise: What picture did APOD feature on your birthday? (post 1995)",
    hdurl: "https://apod.nasa.gov/apod/image/2405/AuroraSweden_Strand_1500.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Green Aurora over Sweden",
    url: "https://apod.nasa.gov/apod/image/2405/AuroraSweden_Strand_960.jpg",
  },
  {
    copyright: "Christophe Vergnes",
    date: "2024-05-23",
    explanation:
      "Spiral galaxy NGC 3169 looks to be unraveling like a ball of cosmic yarn. It lies some 70 million light-years away, south of bright star Regulus toward the faint constellation Sextans. Wound up spiral arms are pulled out into sweeping tidal tails as NGC 3169 (left) and neighboring NGC 3166 interact gravitationally. Eventually the galaxies will merge into one, a common fate even for bright galaxies in the local universe. Drawn out stellar arcs and plumes are clear indications of the ongoing gravitational interactions across the deep and colorful galaxy group photo. The telescopic frame spans about 20 arc minutes or about 400,000 light-years at the group's estimated distance, and includes smaller, bluish NGC 3165 to the right. NGC 3169 is also known to shine across the spectrum from radio to X-rays, harboring an active galactic nucleus that is the site of a supermassive black hole.",
    hdurl: "https://apod.nasa.gov/apod/image/2405/N3169N3166Final.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Unraveling NGC 3169",
    url: "https://apod.nasa.gov/apod/image/2405/N3169N3166Final1024.jpg",
  },
  {
    date: "2024-05-24",
    explanation:
      "Star formation can be messy. To help find out just how messy, ESA's new Sun-orbiting Euclid telescope recently captured the most detailed image ever of the bright star forming region M78. Near the image center, M78 lies at a distance of only about 1,300 light-years away and has a main glowing core that spans about 5 light-years.  The featured image was taken in both visible and infrared light. The purple tint in M78's center is caused by dark dust preferentially reflecting the blue light of hot, young stars.  Complex dust lanes and filaments can be traced through this gorgeous and revealing skyscape. On the upper left is associated star forming region NGC 2071, while a third region of star formation is visible on the lower right.  These nebulas are all part of the vast Orion Molecular Cloud Complex which can be found with even a small telescope just north of Orion's belt.   More Euclid Sky Candy: Recent images released from Euclid",
    hdurl: "https://apod.nasa.gov/apod/image/2405/M78_Euclid_5532.jpg",
    media_type: "image",
    service_version: "v1",
    title: "M78 from the Euclid Space Telescope",
    url: "https://apod.nasa.gov/apod/image/2405/M78_Euclid_960.jpg",
  },
  {
    date: "2024-05-25",
    explanation:
      "Orbiting 400 kilometers above Quebec, Canada, planet Earth, the International Space Station Expedition 59 crew captured this snapshot of the broad St. Lawrence River and curiously circular Lake Manicouagan on April 11. Right of center, the ring-shaped lake is a modern reservoir within the eroded remnant of an ancient 100 kilometer diameter impact crater. The ancient crater is very conspicuous from orbit, a visible reminder that Earth is vulnerable to rocks from space. Over 200 million years old, the Manicouagan crater was likely caused by the impact of a rocky body about 5 kilometers in diameter.  Currently, there is no known asteroid with a significant probability of impacting Earth in the next century.  Each month, NASA’s Planetary Defense Coordination Office releases an update featuring the most recent figures on near-Earth object close approaches, and other facts about comets and asteroids that could pose a potential impact hazard with Earth.",
    hdurl: "https://apod.nasa.gov/apod/image/2405/iss059e019043.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Manicouagan Impact Crater from Space",
    url: "https://apod.nasa.gov/apod/image/2405/iss059e019043_1024.jpg",
  },
  {
    date: "2024-05-26",
    explanation:
      "What's happened to our Sun?  Nothing very unusual -- it just threw a filament. Toward the middle of 2012, a long standing solar filament suddenly erupted into space, producing an energetic coronal mass ejection (CME).  The filament had been held up for days by the Sun's ever changing magnetic field and the timing of the eruption was unexpected. Watched closely by the Sun-orbiting Solar Dynamics Observatory, the resulting explosion shot electrons and ions into the Solar System, some of which arrived at Earth three days later and impacted Earth's magnetosphere, causing visible auroras. Loops of plasma surrounding the active region can be seen above the erupting filament in the featured ultraviolet image. Our Sun is nearing the most active time in its 11-year cycle, creating many coronal holes that allow for the ejection of charged particles into space. As before, these charged particles can create auroras.    Your Sky Surprise: What picture did APOD feature on your birthday? (post 1995)",
    hdurl: "https://apod.nasa.gov/apod/image/2405/filament_sdo_1080.jpg",
    media_type: "image",
    service_version: "v1",
    title: "A Solar Filament Erupts",
    url: "https://apod.nasa.gov/apod/image/2405/filament_sdo_960.jpg",
  },
  {
    copyright: "Amiel Contuliano",
    date: "2024-05-27",
    explanation:
      "Dark markings and bright nebulae in this telescopic southern sky view are telltale signs of young stars and active star formation. They lie a mere 650 light-years away, at the boundary of the local bubble and the Chamaeleon molecular cloud complex. Regions with young stars identified as dusty reflection nebulae from the 1946 Cederblad catalog include the C-shaped Ced 110 just above and right of center, and bluish Ced 111 below it. Also a standout in the frame, the orange tinted V-shape of the Chamaeleon Infrared Nebula (Cha IRN) was carved by material streaming from a newly formed low-mass star.  The well-composed image spans 1.5 degrees. That's about 17 light-years at the estimated distance of the nearby Chamaeleon I molecular cloud.",
    hdurl: "https://apod.nasa.gov/apod/image/2405/Cederblad111-110.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Chamaeleon I Molecular Cloud",
    url: "https://apod.nasa.gov/apod/image/2405/Cederblad111-110_1024.jpg",
  },
  {
    date: "2024-05-28",
    explanation:
      "It's back. The famous active region on the Sun that created auroras visible around the Earth earlier this month has survived its rotation around the far side of the Sun -- and returned.  Yesterday, as it was beginning to reappear on the Earth-facing side, the region formerly labeled AR 3664 threw another major solar flare, again in the highest-energy X-class range. The featured video shows the emerging active region on the lower left, as it was captured by NASA's Earth-orbiting Solar Dynamics Observatory yesterday in ultraviolet light. The video is a time-lapse of the entire Sun rotating over 24 hours.  Watch the lower-left region carefully at about the 2-second mark to see the powerful flare burst out. The energetic particles from that flare and associated CME are not expected to directly impact the Earth and trigger impressive auroras, but scientists will keep a close watch on this unusually active region over the next two weeks, as it faces the Earth, to see what develops.",
    media_type: "video",
    service_version: "v1",
    title: "Solar X Flare as Famous Active Region Returns",
    url: "https://www.youtube.com/embed/yt7uwWzSTw0?rel=0",
  },
  {
    copyright: "\nMarcin Rosadziński\n",
    date: "2024-05-29",
    explanation:
      "What happens if you ascend this stairway to the Milky Way? Before answering that, let's understand the beautiful sky you will see.  Most eye-catching is the grand arch of the Milky Way Galaxy, the band that is the central disk of our galaxy which is straight but distorted by the wide-angle nature of this composite image.  Many stars well in front of the Milk Way will be visible, with the bright white star just below the stellar arch being Altair, and the bright blue star above it being Vega.  The air glows green on the left, just above the yellow cloud deck.  The featured image was taken last month on Portugal's Madeira Island in the North Atlantic Ocean.  Oh, and what happens after you reach the top of these stairs and admire the amazing sky is, quite probably, that you then descend down the stairs on the other side.   Your Sky Surprise: What picture did APOD feature on your birthday? (post 1995)",
    hdurl:
      "https://apod.nasa.gov/apod/image/2405/StairwayToMilkyway_Marcin_6000.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Stairway to the Milky Way",
    url: "https://apod.nasa.gov/apod/image/2405/StairwayToMilkyway_Marcin_1080.jpg",
  },
  {
    copyright: "\nValter Binotto\n",
    date: "2024-05-30",
    explanation:
      "Why does a cloudy moon sometimes appear colorful? The effect, called a lunar corona, is created by the quantum mechanical diffraction of light around individual, similarly-sized water droplets in an intervening but mostly-transparent cloud. Since light of different colors has different wavelengths, each color diffracts differently. Lunar coronae are one of the few  quantum mechanical color effects that can be easily seen with the unaided eye.  Solar coronae are also sometimes evident. The featured image was taken last month from Paris, France.  The blue beacon emanating from the Eiffel Tower did not affect the colorful lunar corona.   Portal Universe: Random APOD Generator",
    hdurl:
      "https://apod.nasa.gov/apod/image/2405/EiffelCorona_Binotto_2000.jpg",
    media_type: "image",
    service_version: "v1",
    title: "A Lunar Corona over Paris",
    url: "https://apod.nasa.gov/apod/image/2405/EiffelCorona_Binotto_960.jpg",
  },
  {
    copyright: "Xin Long",
    date: "2024-05-31",
    explanation:
      "Made with narrowband filters, this cosmic snapshot covers a field of view over twice as wide as the full Moon within the boundaries of the constellation Cygnus. It highlights the bright edge of a ring-like nebula traced by the glow of ionized hydrogen and oxygen gas. Embedded in the region's expanse of interstellar clouds, the complex, glowing arcs are sections of shells of material swept up by the wind from Wolf-Rayet star WR 134, brightest star near the center of the frame. Distance estimates put WR 134 about 6,000 light-years away, making the frame over 100 light-years across. Shedding their outer envelopes in powerful stellar winds, massive Wolf-Rayet stars have burned through their nuclear fuel at a prodigious rate and end this final phase of massive star evolution in a spectacular supernova explosion. The stellar winds and final supernova enrich the interstellar material with heavy elements to be incorporated in future generations of stars.",
    hdurl:
      "https://apod.nasa.gov/apod/image/2405/NebulousRealmofWR134_2048.png",
    media_type: "image",
    service_version: "v1",
    title: "The Nebulous Realm of WR 134",
    url: "https://apod.nasa.gov/apod/image/2405/NebulousRealmofWR134_1024.png",
  },
  {
    date: "2024-06-01",
    explanation:
      "Get out your red/blue glasses and float next to Helene, small, icy moon of Saturn. Appropriately named, Helene is a Trojan moon, so called because it orbits at a Lagrange point. A Lagrange point is a gravitationally stable position near two massive bodies, in this case Saturn and larger moon Dione. In fact, irregularly shaped ( about 36 by 32 by 30 kilometers) Helene orbits at Dione's leading Lagrange point while brotherly ice moon Polydeuces follows at Dione's trailing Lagrange point. The sharp stereo anaglyph was constructed from two Cassini images captured during a close flyby in 2011. It shows part of the Saturn-facing hemisphere of Helene mottled with craters and gully-like features.",
    hdurl: "https://apod.nasa.gov/apod/image/2406/N00172886_92_beltramini.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Stereo Helene",
    url: "https://apod.nasa.gov/apod/image/2406/N00172886_92_beltramini.jpg",
  },
  {
    date: "2024-06-02",
    explanation:
      "No one, presently, sees the Moon rotate like this. That's because the Earth's moon is tidally locked to the Earth, showing us only one side.  Given modern digital technology, however, combined with many detailed images returned by the Lunar Reconnaissance Orbiter (LRO), a high resolution virtual Moon rotation movie has been composed. The featured time-lapse video starts with the standard Earth view of the Moon. Quickly, though, Mare Orientale, a large crater with a dark center that is difficult to see from the Earth, rotates into view just below the equator.  From an entire lunar month condensed into 24 seconds, the video clearly shows that the Earth side of the Moon contains an abundance of dark lunar maria, while the lunar far side is dominated by bright lunar highlands. Currently, over 32 new missions to the Moon are under active development from multiple countries and companies, including NASA's Artemis program which aims to land people on the Moon again within the next few years.",
    media_type: "video",
    service_version: "v1",
    title: "Rotating Moon from LRO",
    url: "https://www.youtube.com/embed/sNUNB6CMnE8?rel=0",
  },
  {
    copyright: "(Team F.A.C.T.)",
    date: "2024-06-03",
    explanation:
      "Magnificent island universe NGC 2403 stands within the boundaries of the long-necked constellation Camelopardalis. Some 10 million light-years distant and about 50,000 light-years across, the spiral galaxy also seems to have more than its fair share of giant star forming HII regions, marked by the telltale reddish glow of atomic hydrogen gas. The giant HII regions are energized by clusters of hot, massive stars that explode as bright supernovae at the end of their short and furious lives. A member of the M81 group of galaxies, NGC 2403 closely resembles a galaxy in our own local galaxy group with an abundance of star forming regions, M33, the Triangulum Galaxy. Spiky in appearance, bright stars in this portrait of NGC 2403 are in the foreground, within our own Milky Way. Also in the foreground of the deep, wide-field, telescopic image are the Milky Way's dim and dusty interstellar clouds also known as galactic cirrus or integrated flux nebulae. But faint features that seem to extend from NGC 2403 itself are likely tidal stellar streams drawn out by gravitational interactions with neighboring galaxies.",
    hdurl:
      "https://apod.nasa.gov/apod/image/2405/NGC2403-LRGB+Ha+Oiii-v25-f.jpg",
    media_type: "image",
    service_version: "v1",
    title: "NGC 2403 in Camelopardalis",
    url: "https://apod.nasa.gov/apod/image/2405/NGC2403-LRGB+Ha+Oiii-v25-f1024.jpg",
  },
  {
    copyright: "\nRolando Ligustri &\n Lukas Demetz \n",
    date: "2024-06-04",
    explanation:
      "Why does Comet Pons-Brooks now have tails pointing in opposite directions?  The most spectacular tail is the blue-glowing ion tail that is visible flowing down the image.  The ion tail is pushed directly out from the Sun by the solar wind. On the upper right is the glowing central coma of Comet 12P/Pons–Brooks. Fanning out from the coma, mostly to the left, is the comet's dust tail. Pushed out and slowed down by the pressure of sunlight, the dust tail tends to trail the comet along its orbit and, from some viewing angles, can appear opposite to the ion tail.  The distant, bright star Alpha Leporis is seen at the bottom of the featured image captured last week from Namibia. Two days ago, the comet passed its closest to the Earth and is now best visible from southern skies as it dims and glides back to the outer Solar System.",
    hdurl: "https://apod.nasa.gov/apod/image/2406/Comet12P_Ligustri_1601.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Comet Pons-Brooks Develops Opposing Tails",
    url: "https://apod.nasa.gov/apod/image/2406/Comet12P_Ligustri_960.jpg",
  },
];