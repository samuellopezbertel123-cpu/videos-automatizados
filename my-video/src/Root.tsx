import { Composition, Folder } from "remotion";
import { DocumentaryVideo } from "./DocumentaryVideo";
import { pompeiiDemo } from "./documentary-data";
import { pompeiiFinal } from "./pompeii-final";
import { HistoricalMasterVideo } from "./HistoricalMasterVideo";
import { akhenatenDemo } from "./akhenaten-demo";
import { HelloWorld } from "./HelloWorld";
import { Logo } from "./HelloWorld/Logo";
import { Title } from "./HelloWorld/Title";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CRONICAS-DEL-TIEMPO-DEMO"
        component={DocumentaryVideo}
        durationInFrames={pompeiiDemo.durationInFrames}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ video: pompeiiDemo }}
      />
      <Composition
        id="CRONICAS-POMPEYA-60S"
        component={DocumentaryVideo}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ video: pompeiiFinal }}
      />
      <Composition
        id="CRONICAS-AKENATON"
        component={HistoricalMasterVideo}
        durationInFrames={akhenatenDemo.durationInFrames}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ episode: akhenatenDemo }}
      />
      <Composition
        id="CRONICAS-AKENATON1"
        component={HistoricalMasterVideo}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          episode: akhenatenDemo
        }}
      />
      <Folder name="Elements">
        <Composition
          id="Logo"
          component={Logo}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            logoColor1: "#91EAE4",
            logoColor2: "#86A8E7",
          }}
        />
        <Composition
          id="Title"
          component={Title}
          durationInFrames={115}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            titleText: "Welcome to Remotion",
            titleColor: "#000000",
          }}
        />
      </Folder>
      <Composition
        // You can take the "id" to render a video:
        // bunx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
        }}
      />

    </>
  );
};
