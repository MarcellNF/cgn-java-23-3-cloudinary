package com.github.moinmarcell.cgnjava233cloudinary;

import com.cloudinary.Cloudinary;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.Objects;

@Service
@AllArgsConstructor
public class CloudinaryService {
    private final Cloudinary cloudinary;

    public String uploadFile(MultipartFile file) throws IOException {
        File fileToUpload = File.createTempFile("file", null);
        file.transferTo(fileToUpload);
        var cloudinaryResponse = cloudinary.uploader().upload(fileToUpload, Map.of(
                "resource_type", "auto",
                "public_id", Objects.requireNonNull(file.getOriginalFilename()),
                "folder", "cloudinary_file_test"
        ));
        return cloudinaryResponse.get("secure_url").toString();
    }

}
