{ pkgs ? import ./pkgs.nix }:
{
    custodial-wallet-api = pkgs.callPackage ./release.nix {};
    nodejs-16_x = pkgs.nodejs-16_x;
}