import axios from 'axios';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';

import { Check, GameController } from 'phosphor-react';
import { FormEvent, useEffect, useState } from 'react';

import { Input } from './Form/input';

interface Game {
  id: string;
  title: string;
}


export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name) {
      return;
    }

    try {

      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });
      console.log('asasas');
      alert('Ad created successfully!');
    } catch (err) {
      console.log(err);
      alert('Error creating ad!')
    }
  }

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })
  }, []);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
        <Dialog.Title className="text-3xl font-black">Post an Ad</Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="game">What game?</label>

            <Select.Root name="game" >
              <Select.Trigger className="flex justify-between items-start bg-zinc-900 py-3 px-4 rounded text-sm text-zinc-500 appearance-none">
                <Select.Value placeholder="Select the game you want to play" />
                <Select.Icon className="" />
              </Select.Trigger>

              <Select.Portal className="flex justify-center items-start bg-zinc-900 py-3 px-4 rounded text-sm text-zinc-500 appearance-none">
                <Select.Content>
                  <Select.ScrollUpButton />
                  <Select.Viewport className="flex flex-col gap-2">
                    {games.map(game => {
                      return (
                        <Select.Item key={game.id} value={game.id} className="focus:bg-zinc-700 p-1 rounded">
                          <Select.ItemText>{game.title}</Select.ItemText>
                          <Select.ItemIndicator className="bg-zinc-800" />
                        </Select.Item>
                      )
                    })}
                  </Select.Viewport>
                  <Select.ScrollDownButton />
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="username">Your name (or nickname)</label>
            <Input id="username" name="name" placeholder="What are you called in the game?" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="yearsPlaying">How many years have you been playing?</label>
              <Input id="yearsPlaying" name="yearsPlaying" type="number" placeholder="It's ok to be ZERO" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="discord">What's your discord?</label>
              <Input id="discord" name="discord" placeholder="User#0000" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="weekDays">When do you usually play?</label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item value="0" title="Sunday" className={`w-10 h-10 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item value="1" title="Monday" className={`w-10 h-10 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  M
                </ToggleGroup.Item>
                <ToggleGroup.Item value="2" title="Tuesday" className={`w-10 h-10 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item value="3" title="Wednesday" className={`w-10 h-10 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  W
                </ToggleGroup.Item>
                <ToggleGroup.Item value="4" title="Thursday" className={`w-10 h-10 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item value="5" title="Friday" className={`w-10 h-10 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  F
                </ToggleGroup.Item>
                <ToggleGroup.Item value="6" title="Saturday" className={`w-10 h-10 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label className="font-semibold" htmlFor="hourStart">What time of day?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input type="time" id="hourStart" name="hourStart" placeholder="Of" />
                <Input type="time" id="hourEnd" name="hourEnd" placeholder="Until" />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
            <Checkbox.Root checked={useVoiceChannel} onCheckedChange={(checked) => {
              if (checked === true)
                setUseVoiceChannel(true)
              else
                setUseVoiceChannel(false)
            }} className="w-6 h-6 p-1 rounded bg-zinc-900">
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400 font-semibold text-lg" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            I often connect to voice chat
          </label>

          <footer className="mt-4 flex justify-end items-center gap-4">
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
  )
}