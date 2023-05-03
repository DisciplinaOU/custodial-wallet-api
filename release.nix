{ buildYarnPackage
, constGitIgnore
, fetchFromGitHub
}:

buildYarnPackage {
    src = ./.;
}
