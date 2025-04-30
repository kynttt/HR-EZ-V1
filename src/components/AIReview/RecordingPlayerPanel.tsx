// src/components/ai-review/RecordingPlayerPanel.tsx
"use client";

import { FC, useRef, useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Clock,
} from "lucide-react";

interface RecordingPlayerPanelProps {
  src: string;
  title: string;
}

export const RecordingPlayerPanel: FC<RecordingPlayerPanelProps> = ({
  src,
  title,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sync duration & currentTime
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onLoaded = () => setDuration(vid.duration);
    const onTimeUpdate = () => setCurrentTime(vid.currentTime);
    vid.addEventListener("loadedmetadata", onLoaded);
    vid.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      vid.removeEventListener("loadedmetadata", onLoaded);
      vid.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(
        document.fullscreenElement === containerRef.current
      );
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const togglePlay = () => {
    const vid = videoRef.current!;
    if (playing) vid.pause();
    else vid.play();
    setPlaying(!playing);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = parseFloat(e.target.value);
    videoRef.current!.currentTime = t;
    setCurrentTime(t);
  };

  const toggleMute = () => {
    const vid = videoRef.current!;
    vid.muted = !muted;
    setMuted(!muted);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    videoRef.current!.volume = v;
    setVolume(v);
    setMuted(v === 0);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen({
        navigationUI: "hide",
      });
    } else {
      document.exitFullscreen();
    }
  };

  const fmt = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div
      ref={containerRef}
      className={`${
        isFullscreen ? "p-4 bg-black/5" : ""
      }`}
    >
      <Card className={isFullscreen ? "w-full h-full" : "max-w-3xl mx-auto"}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <Button
              size="icon"
              variant="outline"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <Minimize2 className="h-5 w-5" />
              ) : (
                <Maximize2 className="h-5 w-5" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-4">
          <video
            ref={videoRef}
            src={src}
            className="w-full rounded-md bg-gray-200 cursor-pointer"
            onClick={togglePlay}
          />

          {/* Seek */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium">{fmt(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1"
            />
            <span className="text-xs font-medium">{fmt(duration)}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                variant="outline"
                onClick={togglePlay}
              >
                {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={toggleMute}
              >
                {muted || volume === 0 ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={handleVolume}
                className="w-24"
              />
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>

          <Separator />

          {/* AI Interview Analysis */}
          <section className="space-y-4 ">
            <h3 className="text-lg font-semibold">AI Interview Analysis</h3>
            <p className="text-sm leading-relaxed">
              Throughout the recorded session, the candidate exhibited clear
              communication skills, articulating their design rationale with
              confidence. They seamlessly referenced past projects to justify
              their approach, demonstrating strong domain knowledge in user‐
              centered design and prototyping workflows.
            </p>
            <p className="text-sm leading-relaxed">
              On the technical side, they showed proficiency with modern front‐
              end frameworks but revealed a gap in automated testing
              methodologies. Their enthusiasm to learn and adapt, however,
              suggests they will quickly pick up any missing tooling through
              peer mentorship.
            </p>
            <p className="text-sm leading-relaxed">
              Overall, the candidate’s collaborative mindset, rapid problem‐
              solving ability, and demonstrated leadership in cross‐functional
              teams position them as a high‐potential hire. We recommend moving
              forward with a live coding evaluation to further assess their
              architectural thinking.
            </p>
          </section>
          <Separator />

          {/* Proceed/Reject */}
          <div className="flex gap-2 justify-end">  {/* Proceed Button */}
                   <Button
                    variant="default"
                    size="sm"
                    onClick={() => {
                      console.log("Proceed with");
                    }}
                  >
                    Proceed
                  </Button>
                  {/* Reject Button */}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      console.log("Reject");
                    }}
                  >
                    Reject
                  </Button></div>
        </CardContent>
      </Card>
    </div>
  );
};
