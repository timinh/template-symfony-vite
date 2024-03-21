<?php

namespace App\Twig;

use Twig\TwigFunction;
use Twig\Extension\AbstractExtension;

class ViteAssetExtension extends AbstractExtension
{
	private bool $isDev;
	private $manifestData;

    public function __construct(
        readonly string $mode,
        private readonly string $manifest,
        private readonly string $buildFolder = '/build/',
        private readonly string $viteServer = 'http://localhost:3000'
    ) {
		$this->isDev = ($mode === 'dev');
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('vite_asset', [$this, 'asset'], ['is_safe' => ['html']])
        ];
    }

    public function asset(string $entry): string
    {
        return $this->isDev ? $this->assetDev($entry) : $this->assetProd($entry);
    }

    public function assetDev(string $entry): string
    {
        $html = '<script type="module" src="' . $this->viteServer . '/@vite/client"></script>';
        $html = '<script type="module" src="' . $this->viteServer. $this->buildFolder . $entry . '" defer></script>';
        return $html;
    }

    private function assetProd(string $entry): string
    {
        if ($this->manifestData === null) {
            $this->manifestData = json_decode(file_get_contents($this->manifest), true);
        }
        $file = $this->manifestData[$entry]['file'];
        $css = isset($this->manifestData[$entry]['css']) ? $this->manifestData[$entry]['css'] : [];
        $imports = isset($this->manifestData[$entry]['imports']) ? $this->manifestData[$entry]['imports'] : [];

        $html = '<script type="module" src="'. $this->buildFolder . $file . '" defer></script>';
        foreach ($css as $cssFile) {
            $html .= '<link rel="stylesheet" media="screen" href="' .$this->buildFolder . $cssFile . '"/>';
        }
        foreach ($imports as $import) {
            $html .= '<link rel="modulepreload href="' . $this->buildFolder . $import . '"/>';
        }
        return $html;
    }
}
