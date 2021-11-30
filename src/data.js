import { v4 as uuidv4 } from "uuid";

function songs() {
  return [
    {
      name: "Rain",
      artist: "Rainy Day Playlist",
      cover:
        "https://images.unsplash.com/photo-1520699697851-3dc68aa3a474?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fHJhaW58ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      id: uuidv4(),
      active: true,
      color: ["#205950", "#2ab3bf"],
      audio: "http://stream1.radiotape.fm:8000/60",
    },
    {
      name: "Sun",
      artist: "Sunny Day Playlist",
      cover:
        "https://images.unsplash.com/photo-1527206363095-ca2f054128b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      id: uuidv4(),
      active: false,
      color: "",
      audio: "http://stream1.radiotape.fm:8000/109",
    },
    {
      name: "Snow",
      artist: "Snowflake Playlist",
      cover:
        "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c25vd3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      id: uuidv4(),
      active: false,
      color: "",
      audio: "http://stream1.radiotape.fm:8000/109",
    },
    {
      name: "Clowds",
      artist: "Clowdy Days Playlist",
      cover:
        "https://images.unsplash.com/photo-1530625243345-797b4c1836ee?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzZ8fGNsb3VkfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      id: uuidv4(),
      active: false,
      color: "",
      audio: "http://stream1.radiotape.fm:8000/109",
    },
  ];
}

export default songs;
