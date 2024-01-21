import { DialogTrigger } from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import {
  CheckIcon,
  ChevronRightIcon,
  ClipboardIcon,
  DownloadIcon,
  ImageIcon,
  QrCodeIcon,
} from 'lucide-react';
import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';
import {
  QRCodeSVG,
  getQRAsCanvas,
  getQRAsSVGDataUri,
  getQRDataUri as getQRAsUri,
  type QRProps,
} from '~/lib/qr/qr';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Dialog, DialogContent } from './ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Switch } from './ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export interface QRLinkProps {
  key: string;
}

export function QRCodePicker({
  props,
}: {
  props: QRLinkProps;
}) {
  const anchorRef = useRef<HTMLAnchorElement>(null);

  const qrLogoURL = useMemo(() => {
    return typeof window !== 'undefined' && window.location.origin
      ? new URL('/logo.png', window.location.origin).href
      : 'https://tinybits.vercel.app/logo.png';
  }, []);

  function download(url: string, extension: string) {
    if (!anchorRef.current) return;
    anchorRef.current.href = url;
    anchorRef.current.download = `qrcode.${extension}`;
    anchorRef.current.click();
  }

  const [showLogo, setShowLogo] = useState(true);
  const [fgColor, setFgColor] = useState('#000000');

  const qrData = useMemo(
    () => ({
      value: `https://tinybits.vercel.app/${props.key}`,
      bgColor: '#ffffff',
      fgColor,
      size: 1024,
      level: 'Q', // QR Code error correction level: https://blog.qrstuff.com/general/qr-code-error-correction
      ...(showLogo && {
        imageSettings: {
          src: qrLogoURL,
          height: 256,
          width: 256,
          excavate: true,
        },
      }),
    }),
    [props, fgColor, showLogo, qrLogoURL]
  );

  const [copied, setCopied] = useState(false);
  const copyToClipboard = async () => {
    const canvas = await getQRAsCanvas(qrData);
    (canvas as HTMLCanvasElement).toBlob(async blob => {
      if (!blob) throw new Error('Failed to copy QR code to clipboard');
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 px-4 py-4 pt-8 sm:px-16">
        <Avatar>
          <AvatarImage src="/logo.png" />
        </Avatar>
        <h3 className="text-lg font-medium">Download QR Code</h3>
      </div>

      <div className="flex flex-col space-y-6 bg-gray-50 py-6 text-left sm:rounded-b-2xl">
        <div className="mx-auto rounded-lg border-2 border-gray-200 bg-white p-4">
          <QRCodeSVG
            value={qrData.value}
            size={qrData.size / 8}
            bgColor={qrData.bgColor}
            fgColor={qrData.fgColor}
            level={qrData.level}
            includeMargin={false}
            // @ts-ignore
            imageSettings={
              showLogo && {
                ...qrData.imageSettings,
                height: qrData.imageSettings
                  ? qrData.imageSettings.height / 8
                  : 0,
                width: qrData.imageSettings
                  ? qrData.imageSettings.width / 8
                  : 0,
              }
            }
          />
        </div>

        <AdvancedSettings
          qrData={qrData}
          setFgColor={setFgColor}
          showLogo={showLogo}
          setShowLogo={setShowLogo}
        />

        <div className="grid grid-cols-2 gap-2 px-4 sm:px-16">
          <Button
            onClick={async () => {
              toast.promise(copyToClipboard, {
                loading: 'Copying QR code to clipboard...',
                success: 'Copied QR code to clipboard!',
                error: 'Failed to copy',
              });
            }}
          >
            {copied ? (
              <>
                <CheckIcon className="size-4 mr-2" /> Copied
              </>
            ) : (
              <>
                <ClipboardIcon className="size-4 mr-2" /> Copy
              </>
            )}
          </Button>
          <QrDropdown
            download={download}
            qrData={qrData}
            showLogo={showLogo}
            logo={qrLogoURL}
          />
        </div>

        {/* This will be used to prompt downloads. */}
        <a
          href="/logo.png"
          className="hidden"
          download={'qrcode.svg'}
          ref={anchorRef}
        >
          QrCode
        </a>
      </div>
    </>
  );
}

interface AdvancedSettingsProps {
  qrData: QRProps;
  setFgColor: Dispatch<SetStateAction<string>>;
  showLogo: boolean;
  setShowLogo: Dispatch<SetStateAction<boolean>>;
}

const FADE_IN_ANIMATION_SETTINGS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

function AdvancedSettings({
  qrData,
  setFgColor,
  showLogo,
  setShowLogo,
}: AdvancedSettingsProps) {
  const [expanded, setExpanded] = useState(false);

  const debouncedSetFgColor = useDebouncedCallback(color => {
    setFgColor(color);
  }, 100);

  return (
    <div>
      <div className="px-4 sm:px-16">
        <button
          type="button"
          className="flex items-center"
          onClick={() => setExpanded(!expanded)}
        >
          <ChevronRightIcon
            className={`h-5 w-5 text-gray-600 ${
              expanded ? 'rotate-90' : ''
            } transition-all`}
          />
          <p className="text-sm text-gray-600">Advanced options</p>
        </button>
      </div>
      {expanded && (
        <motion.div
          key="advanced-options"
          {...FADE_IN_ANIMATION_SETTINGS}
          className="mt-4 grid gap-5 border-b border-t border-gray-200 bg-white px-4 py-8 sm:px-16"
        >
          <div>
            <label
              htmlFor="logo-toggle"
              className="flex items-center space-x-1"
            >
              <p className="text-sm font-medium text-gray-700">Logo</p>
            </label>
            <div className="mt-1 flex items-center space-x-2">
              <Switch checked={showLogo} onCheckedChange={setShowLogo} />
              <p className="text-sm text-gray-600">Show Logo</p>
            </div>
          </div>
          <div>
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-700"
            >
              Foreground Color
            </label>
            <div className="relative mt-1 flex h-9 w-48 rounded-md shadow-sm">
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <div
                    className="h-full w-12 rounded-l-md border"
                    style={{
                      backgroundColor: qrData.fgColor,
                      borderColor: qrData.fgColor,
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent
                  sideOffset={10}
                  className="bg-white max-w-sm shadow-md border p-5 rounded-lg"
                >
                  <HexColorPicker
                    color={qrData.fgColor}
                    onChange={debouncedSetFgColor}
                  />
                </TooltipContent>
              </Tooltip>
              <HexColorInput
                id="color"
                name="color"
                color={qrData.fgColor}
                onChange={color => setFgColor(color)}
                prefixed
                style={{ borderColor: qrData.fgColor }}
                className="block w-full rounded-r-md border-2 border-l-0 pl-3 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-black sm:text-sm"
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

interface QRDropdownProps {
  download: (url: string, extension: string) => void;
  qrData: QRProps;
  showLogo: boolean;
  logo: string;
}

function QrDropdown({ download, qrData, showLogo, logo }: QRDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <DownloadIcon className="size-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-40">
        <DropdownMenuItem
          className="p-2"
          onClick={() => {
            download(
              // @ts-ignore
              getQRAsSVGDataUri({
                ...qrData,
                ...(showLogo && {
                  imageSettings: {
                    ...qrData.imageSettings,
                    src: logo || 'https://dub.co/_static/logo.svg',
                  },
                }),
              }),
              'svg'
            );
          }}
        >
          <ImageIcon className="size-4 mr-2" /> SVG
        </DropdownMenuItem>
        <DropdownMenuItem
          className="p-2"
          onClick={async () => {
            download(await getQRAsUri(qrData, 'image/png'), 'png');
          }}
        >
          <ImageIcon className="size-4 mr-2" /> PNG
        </DropdownMenuItem>
        <DropdownMenuItem
          className="p-2"
          onClick={async () => {
            download(await getQRAsUri(qrData, 'image/jpeg'), 'jpg');
          }}
        >
          <ImageIcon className="size-4 mr-2" /> JPG
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const useQRCodeModal = (props: QRLinkProps) => {
  const LinkQRModal = useCallback(() => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <button
            className="group rounded-full bg-secondary p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 focus:outline-none active:scale-95"
            type="button"
          >
            <span className="sr-only">Copy</span>
            <QrCodeIcon className="size-3.5 text-primary transition-all group-hover:text-blue-800" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <QRCodePicker props={props} />
        </DialogContent>
      </Dialog>
    );
  }, [props]);

  return {
    LinkQRModal,
  };
};
