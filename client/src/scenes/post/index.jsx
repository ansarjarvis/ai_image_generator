import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../../assets";
import FormField from "../../components/FormField";
import Loader from "../../components/Loader";
import { getRandomPrompt } from "../../utils/index.js";

let Posts = () => {
  let [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  let [isGeneratingImage, setIsGeneratingImage] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  let submitHandler = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setIsLoading(true);
      try {
        let response = await fetch(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1/post`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );
        await response.json();
        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("please enter a prompt and then generate image ");
    }
  };
  let changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  let surpriseMeHandler = () => {
    let randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  let generateImageHandler = async () => {
    if (form.prompt) {
      try {
        setIsGeneratingImage(true);
        let response = await fetch(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1/homer`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );

        let data = await response.json();
        setForm({
          ...form,
          photo: `data:image/jpeg;base64,${data.photo}`,
        });
      } catch (error) {
        alert(error);
        setIsGeneratingImage(false);
      } finally {
        setIsGeneratingImage(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };
  return (
    <>
      <section className="max-w-7xl mx-auto">
        <div>
          <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
          <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
            Create imaginative and visually stunning images by HOMER AI (Clone
            of DALL-E AI) and share them with the community
          </p>
        </div>
        <form className="mt-16 max-w-3xl" onSubmit={submitHandler}>
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Your name"
              type="text"
              name="name"
              placeholder="Homer"
              value={form.name}
              handleChange={changeHandler}
            />
            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="an astronaut lounging in a tropical resort in space, vaporwave"
              value={form.prompt}
              handleChange={changeHandler}
              isSurpriseMe
              handleSurpriseMe={surpriseMeHandler}
            />
            <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
              {form.photo ? (
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={preview}
                  alt="preview"
                  className="w-9/12 h-9/12 object-contain opacity-40"
                />
              )}
              {isGeneratingImage && (
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                  <Loader />
                </div>
              )}
            </div>
          </div>
          <div className="mt-5 flex gap-5">
            <button
              type="button"
              onClick={generateImageHandler}
              className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {isGeneratingImage ? "Generating" : "Generate"}
            </button>
          </div>

          <div className="mt-10">
            <p className="mt-2 text-[#666e75] text-[14px]">
              Once you have created the image you want , you can share it with
              others in the community
            </p>
            <button
              type="submit"
              className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {isLoading ? "Sharing..." : "Share with the Community"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
export default Posts;
