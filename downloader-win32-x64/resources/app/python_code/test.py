import argparse
import pathlib
import os
import youtube_dl as ydl

dir_path = pathlib.Path(os.path.dirname(os.path.realpath(__file__)))

ydl_options = {
    'ffmpeg_location': dir_path / "ffmpeg\\bin",
    'outtmpl': os.path.dirname(os.path.realpath(__file__)) + "\\downloads\\%(title)s.%(ext)s"
}
print(ydl_options["outtmpl"])


links = []


def download(links):
    with ydl.YoutubeDL(ydl_options) as video:
        video.download(links)


parser = argparse.ArgumentParser()
parser.add_argument("URLs", nargs="*", help="Video-URL to be downloaded")
parser.add_argument("-a", "--audio", action="store_true",
                    help="Zu mp3 konvertieren")
parser.add_argument("-f", "--from_file", action="store_true",
                    help="Videos unter Links in der 'links.txt' Datei downloaden")

args = parser.parse_args()

if args.audio:
    ydl_options["format"] = "bestaudio/best"
    ydl_options["postprocessors"] = [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3'
    }]
    print("Audio extraction enabled!")

if args.URLs:
    links += args.URLs

if args.from_file:
    with open(dir_path / "links.txt", "r") as f:
        links += list(map(str.strip, f.readlines()))

with ydl.YoutubeDL(ydl_options) as video:
    video.download(links)
