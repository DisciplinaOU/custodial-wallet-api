import { utils, Contract } from "ethers";

import abi from "./disciplina_abi.json";
import { disciplinaContractAddr } from "../../configs/env";
import { provider } from "../../configs/constants";

const contractInterface = new utils.Interface(abi);

export const disciplinaContract = new Contract(disciplinaContractAddr, contractInterface, provider);