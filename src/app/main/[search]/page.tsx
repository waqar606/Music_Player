"use client";

import React, { useEffect, useRef, useState } from "react";
import Form from "@/components/Form";
import MusicAnimation from "@/components/MusicAnimation";

const Main = ({ params }: { params: any }) => {
  const [showSugg, setShowSugg] = useState(false);
  const [dataG, setData] = useState([]);
  const [url, setUrl] = useState("");
  const [popup, setPopup] = useState(false);
  const [popup2, setPopup2] = useState(false);
  const [erro, setE] = useState(false);
  const [showThumbnail, setShowThumb] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const savedVal = window.localStorage.getItem("showThumb");
    console.log(savedVal);
    setShowThumb(savedVal === "true");
  }, []);

  useEffect(() => {
    const fetchResult = async () => {
      //USING API (THAT USES YTMUSICAPI LIBRARY) BUILT WITHIN NEXTJS
      // const data = await fetch(`/api/search?q=${params.search}`);
      // USING YMUSIC LIBRARY
      // const data = await fetch(`https://ytmusic.vercel.app/search?name=${params.search}`);
      try {
        const data = await fetch(
          `https://www.googleapis.com/youtube/v3/search?q=${params.search}&key=${process.env.customKey}&part=snippet&type=video&maxResults=10`
        );
        const result = await data.json();
        console.log(result.items);
        setData(result.items);
      } catch (error) {
        setE(true);
      }
    };
    fetchResult();
  }, []);

  useEffect(() => {
    if (popup) {
      document.body.style.overflowY = "hidden";
      return () => {
        document.body.style.overflowY = "auto";
      };
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [popup]);

  // function moreDownloadAudio(id:any, digit:any) {
  //   const urlList = [
  //     `https://www.yt2mp3s.me/api/widget?url=https://www.youtube.com/watch?v=${id}`,
  //     `https://apidl.net/api/widget?url=https://www.youtube.com/watch?v=${id}`,
  //   ];
  //   setUrl(urlList[digit]);
  //   setPopup(true);
  //   const p = document.createElement("p");
  //   p.classList.add("text-black", "mt-4", "ms-3", "me-3");
  //   p.innerText = "Choose any download option (192kpbs recommended)";
  //   const iframe = document.createElement("iframe");
  //   iframe.src = url;
  //   iframe.className = "w-full h-full";
  //   // @ts-ignore
  //   iframe.sandbox =
  //     "allow-forms allow-modals allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation allow-downloads";
  //   const overContain = document.getElementById("overlay");
  //   if (overContain) {
  //     overContain.innerHTML = "";
  //     overContain.append(p);
  //     overContain.append(iframe);
  //   }
  // }

  async function moreDownloadAudio(id: any, title: any) {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/getExternalUrl?id=${id}&title=${encodeURIComponent(title)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch the audio URL");
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data.audioURL) {
        const a = document.createElement("a");
        a.href = data.audioURL;
        a.download = `${title}.mp3`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        console.error("Download link not found in response");
      }
    } catch (error) {
      console.error("Error in moreDownloadAudio:", error);
    } finally {
      setLoading(false);
    }
  }

  async function downloadAudio(id: any, title: string) {
    setPopup2(true);
    try {
      const response = await fetch(`/api/download?q=${id}`);
      if (!response.ok) {
        throw new Error("Failed to download audio");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.mp3`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.log(error);
    }
    setPopup2(false);
  }

  function handleClickFOrDropDown() {
    setShowSugg(false);
  }

  const toggleSwitch = () => {
    window.localStorage.setItem("showThumb", String(!showThumbnail));
    setShowThumb(!showThumbnail);
  };

  return (
    <div onClick={handleClickFOrDropDown}>
      {popup ? (
        <div
          className="fixed z-2 overlay w-full h-full flex items-center justify-center"
          onClick={() => setPopup(false)}
        >
          <div className="overlayItem w-4/5 h-3/4 bg-white px-1" id="overlay">
            <p className="text-black mt-4 ms-3 me-3">
              Choose any download option (192kpbs recommended)
            </p>
            <iframe
              src={url}
              frameBorder="0"
              className=" w-full h-full"
              sandbox="allow-forms allow-modals allow-pointer-lock  allow-same-origin allow-scripts allow-top-navigation allow-downloads"
            ></iframe>
          </div>
        </div>
      ) : (
        ""
      )}

      {popup2 ? (
        <div className="fixed z-2 overlay w-full h-full flex items-center justify-center">
          <div
            className="overlayItem w-4/5 h-2/3  bg-white p-6 flex items-center justify-center"
            id="overlay"
          >
            <h1 className="text-black text-center font-extrabold">
              DOWNLOADING PLEASE WAIT
            </h1>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="pt-12">
        <Form
          value={params.search}
          showSugg={showSugg}
          setShowSugg={setShowSugg}
        />
      </div>

      <div className="mt-6 container mx-auto flex flex-row justify-center items-center ">
        <p className="text-white me-3">Show Thumbnail</p>
        <div
          onClick={toggleSwitch}
          className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors ${
            showThumbnail ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`transform transition-transform ${
              showThumbnail ? "translate-x-6" : "translate-x-1"
            } inline-block w-4 h-4 bg-white rounded-full`}
          />
        </div>
      </div>

      {!erro ? (
        <>
          <div
            className="container mt-4 px-16 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-md
    lg:gap-8
    "
          >
            {dataG ? (
              dataG.map((element: any, index: number) => (
                <div
                  key={element.id.videoId}
                  className="card bg-newGrey flex flex-col justify-between p-4"
                >
                  <div>
                    <div className="">
                      {showThumbnail ? (
                        <img
                          src={
                            element.snippet.thumbnails.high
                              ? element.snippet.thumbnails.high.url
                              : element.snippet.thumbnails.medium
                              ? element.snippet.thumbnails.medium.url
                              : element.snippet.thumbnails.default.url
                          }
                          alt="Image Preview Unavailable"
                          className="rounded-md w-full text-white"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div>
                      <h1 className="text-white font-extrabold titleH1">
                        {element.snippet.title}
                      </h1>
                      <p className="text-myGrey">
                        {element.snippet.channelTitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div>
                      <button
                        className="w-full p-3 border border-solid 
                    border-myPurple text-myPurple rounded font-bold hover:text-white hover:bg-myPurple"
                        onClick={() =>
                          downloadAudio(
                            element.id.videoId,
                            element.snippet.title
                          )
                        }
                      >
                        Download
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <a
                        href={`/play/${element.id.videoId}?name=${element.snippet.title}&author=${element.snippet.channelTitle}`}
                        target="_blank"
                        className="text-white bg-black w-1/2 p-2 border border-solic 
                    rounded hover:border-black hover:bg-white hover:text-black text-center"
                      >
                        Play
                      </a>
                      <button
                        className="text-white bg-black w-1/2 p-2 border border-solic 
                    rounded hover:border-black hover:bg-white hover:text-black"
                        onClick={() =>
                          moreDownloadAudio(
                            element.id.videoId,
                            element.snippet.title
                          )
                        }
                      >
                        {loading ? "Loading" : "More"}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <MusicAnimation />
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center text-white w-full mt-10">
          Theres an issue with the app please try again later..
        </div>
      )}
    </div>
  );
};

export default Main;
