import { v4 as uuidv4 } from "uuid";

function rainList() {
  return [
    {
      name: "Luehmanns",
      artist: "Luehmanns",
      cover: "http://cdn.radiotape.mairlist.net/cover/3AAA59F56D88E800.png",
      id: uuidv4(),
      active: false,
      color: "",
      audio: "http://stream1.radiotape.fm:8000/60",
    },
    {
      name: "Brueckenhaus",
      artist: "Brueckenhaus",
      cover: "http://cdn.radiotape.mairlist.net/cover/B5A3ADDBDE48E754.png",
      id: uuidv4(),
      active: false,
      color: "",
      audio: "http://stream1.radiotape.fm:8000/109",
    },
  ];
}

export default rainList;
