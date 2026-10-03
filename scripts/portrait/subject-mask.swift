// Apple Vision subject lift for the portrait photo (macOS 14+): writes the foreground mask as a PNG.
//   swiftc subject-mask.swift -o /tmp/subject-mask && /tmp/subject-mask original.jpg subject-mask.png
import CoreImage
import Foundation
import Vision

let args = CommandLine.arguments
let handler = VNImageRequestHandler(url: URL(fileURLWithPath: args[1]), options: [:])
let request = VNGenerateForegroundInstanceMaskRequest()
try handler.perform([request])
guard let observation = request.results?.first, let first = observation.allInstances.first else { fatalError("no subject found") }
let mask = try observation.generateScaledMaskForImage(forInstances: IndexSet(integer: first), from: handler)
try CIContext().writePNGRepresentation(of: CIImage(cvPixelBuffer: mask), to: URL(fileURLWithPath: args[2]), format: .L8, colorSpace: CGColorSpaceCreateDeviceGray())
