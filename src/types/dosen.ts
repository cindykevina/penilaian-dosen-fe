import { Homebase } from "./homebase";

export interface Dosen {
  id: number;
  nama: string;
  nip: string;
  jabatan: string;
  homebase: Homebase;
  homebaseId: string;
  Report?: Report[]
}
