import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';

import { GameController } from 'phosphor-react';

import { CreateAdBanner } from './components/CreateAdBanner';
import { GameBanner } from "./components/GameBanner";
import { Input } from './components/Form/input';

import './styles/main.css';
import logoImg from './assets/logo-nlw-esports.svg';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Your
        <span className="text-transparent bg-nlw-gradient bg-clip-text"> duo </span>
        is here.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

          <Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
            <Dialog.Title className="text-3xl text-white font-black">Post an Ad</Dialog.Title>
            <form className="mt-8 flex flex-col gap-4" >
              <div className="flex flex-col gap-2 ">
                <label className="font-semibold" htmlFor="game">What game?</label>
                <Input id="game" placeholder="Select the game you want to play" />
              </div>

              <div className="flex flex-col py-2">
                <label className="font-semibold" htmlFor="name">Your name (or nickname)</label>
                <Input id="name" placeholder="What are you called in the game?" className='bg-zinc-900 text-zinc-500 placeholder:text-zinc-500 rounded py-4 px-4 text-sm' />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2" >
                  <label className="font-semibold" htmlFor="yearsPlaying">How many years have you been playing?</label>
                  <Input id="yearsPlaying" type="number" placeholder="It's ok to be ZERO" className='bg-zinc-900 text-zinc-500 placeholder:text-zinc-500 rounded py-4 px-4 text-sm' />
                </div>

                <div className="flex flex-col gap-2" >
                  <label className="font-semibold" htmlFor="discord">What's your discord?</label>
                  <Input id="discord" placeholder="User#0000" className='bg-zinc-900 text-zinc-500 placeholder:text-zinc-500 rounded py-4 px-4 text-sm' />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-semibold" htmlFor="weekDays">When do you usually play?</label>

                  <div className="grid grid-cols-5 gap-1">
                    <label htmlFor="sunday" className="w-10 h-10 bg-zinc-900 hover:bg-violet-500 text-white rounded flex justify-center items-center p-2">S</label>
                    <Input id="sunday" type="checkbox" className="w-0 h-0 hidden" />

                    <label htmlFor="monday" className="w-10 h-10 bg-zinc-900 hover:bg-violet-500 text-white rounded flex justify-center items-center p-2">M</label>
                    <Input id="monday" type="checkbox" className="w-0 h-0 hidden peer" />

                    <label htmlFor="tuesday" className="w-10 h-10 bg-zinc-900 hover:bg-violet-500 text-white rounded flex justify-center items-center p-2">T</label>
                    <Input id="tuesday" type="checkbox" className="w-0 h-0" />

                    <label htmlFor="wednesday" className="w-10 h-10 bg-zinc-900 hover:bg-violet-500 text-white rounded flex justify-center items-center p-2">W</label>
                    <Input id="wednesday" type="checkbox" className="w-0 h-0" />

                    <label htmlFor="thursday" className="w-10 h-10 bg-zinc-900 hover:bg-violet-500 text-white rounded flex justify-center items-center p-2">T</label>
                    <Input id="thursday" type="checkbox" className="w-0 h-0" />

                    <label htmlFor="friday" className="w-10 h-10 bg-zinc-900 hover:bg-violet-500 text-white rounded flex justify-center items-center p-2">F</label>
                    <Input id="friday" type="checkbox" className="w-0 h-0" />

                    <label htmlFor="saturday" className="w-10 h-10 bg-zinc-900 hover:bg-violet-500 text-white rounded flex justify-center items-center p-2">S</label>
                    <Input id="saturday" type="checkbox" className="w-0 h-0" />
                  </div>
                </div>

                <div className="flex flex-col gap-2 ">
                  <label className="font-semibold" htmlFor="hourStart">What time of day?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="time" id="hourStart" placeholder="Of" />
                    <Input type="time" id="hourEnd" placeholder="Until" />
                  </div>
                </div>
              </div>

              <div className="mt-2 flex gap-2 text-sm">
                {/* <Checkbox.Root>
                  <Checkbox.Indicator />
                </Checkbox.Root> */}

                <Input type="checkbox" id="useVoiceChannel" />
                <label className='text-zinc-500 placeholder:text-zinc-500 rounded text-sm' htmlFor="useVoiceChannel" >I often connect to voice chat</label>
              </div>

              <footer className="mt-4 flex justify-end items-center gap-2">
                <Dialog.Close className="bg-zinc-500 px-5 h-10 rounded-md font-semibold hover:bg-zinc-600">Cancel</Dialog.Close>
                <button type="submit" className="flex gap-3 justify-center items-center bg-violet-500 px-5 h-10 rounded-md font-semibold hover:bg-violet-600">
                  <GameController size={24} />
                  Find your duo
                </button>
              </footer>

            </form>
            <Dialog.Close />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App
