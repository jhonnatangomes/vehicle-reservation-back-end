import faker from "@faker-js/faker";
import VehicleImage from "../../src/entities/Image";
import Vehicle from "../../src/entities/Vehicle";

export default class ImageFactory {
    static createImage(vehicle: Vehicle) {
        const image = VehicleImage.create({
            url: faker.image.imageUrl(),
            color: faker.commerce.color(),
            vehicle,
        });
        return image;
    }

    static async createImages(vehicles: Vehicle[]) {
        const images = [];
        for (let i = 0; i < vehicles.length; i++) {
            images.push(this.createImage(vehicles[i]));
            images.push(this.createImage(vehicles[i]));
        }
        await VehicleImage.save(images);
        return images;
    }
}
