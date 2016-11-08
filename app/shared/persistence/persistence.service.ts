import { Injectable } from "@angular/core";
import { knownFolders, File } from "file-system";

@Injectable()
export class PersistenceService {
  private static storeFileName: string = "rom-store.json";

  /**
   * Read object from store by key.
   * @param key The store key.
   */
  public read<T>(key: string): Promise<T> {
    const file = this.getFile();

    return file.readText().then(readData => {
      if (!readData) {
        return undefined;
      }

      const data = JSON.parse(readData);
      return data[key];
    });
  }

  /**
   * Write serializable object to store by key.
   * @param key The store key.
   * @param data The data to write. This must be serializable.
   */
  public write<T>(key: string, data: T): Promise<T> {
    const file = this.getFile();

    return file.readText().then((readJsonData) => {
      if (!readJsonData) {
        readJsonData = "";
      }
      const readData = JSON.parse(readJsonData);

      readData[key] = data;

      const newJsonData = JSON.stringify(readData);

      return file.writeText(newJsonData);
    });
  }

  /**
   * Clear store permanently.
   */
  public clear(): Promise<void> {
    return knownFolders.documents().clear();
  }

  /**
   * Get store file.
   */
  private getFile(): File {
    return knownFolders.documents().getFile(PersistenceService.storeFileName);
  }
}
