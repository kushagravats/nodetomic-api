import { result, notFound, error } from 'express-easy-helper';
import { emit } from '../sockets/example.socket';
import Example from '../models/example.model';

// List Examples
export function list(req, res) {
  Example.find()
    .then((examples) => result(res, examples))
    .catch((err) => error(res, err));
}

// Create a new Example
export function create(req, res) {
  Example.create(req.body)
    .then((example) => result(res, example, 201))
    .catch((err) => error(res, err));
}

// Read a specific Example by ID
export function read(req, res) {
  Example.findById(req.params.id)
    .then((example) => notFound(res, example))
    .then((example) => result(res, example))
    .catch((err) => error(res, err));
}

// Update a specific Example by ID
export function update(req, res) {
  Example.findByIdAndUpdate(
    req.params.id,
    { $set: { greet: req.body.greet, language: req.body.language } },
    { new: true }
  )
    .then((example) => notFound(res, example))
    .then((example) => result(res, example))
    .catch((err) => error(res, err));
}

// Delete a specific Example by ID
export function destroy(req, res) {
  Example.deleteOne({ _id: req.params.id })
    .then(() => result(res, 'Example deleted successfully'))
    .catch((err) => error(res, err));
}

// Emit animation with socket
export function animation(req, res) {
  try {
    emit('animation', req.params.id);
    return result(res, 'Socket emitted!');
  } catch (err) {
    return error(res, 'No client with event...');
  }
}
